import Modal from "@lib/DesignSystem/Modal/Modal";
import styled from "styled-components";
import { theme } from "@styles/theme";
import { useEffect, useState } from "react";
import useApplyLists from "src/hooks/useApplyLists";
import totalCount from "src/hooks/totalCount";
import SortPolygon from "@lib/DesignSystem/Icon/SortPolygon";
import { useRouter } from "next/router";
import Apply from "@components/ApplyLists";
import { INITIAL } from "@components/ApplyLists/contacts";

interface StatusI {
  [key: string]: boolean;
}

interface PartI {
  [key: string]: boolean;
}

function ApplyLists() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<StatusI>(INITIAL.STATUS);
  const [part, setPart] = useState<PartI>(INITIAL.PART);
  const [sort, setSort] = useState("updatedAt_asc");
  const [page, setPage] = useState(1);

  const users = useApplyLists().data.user;
  const router = useRouter();

  const statusList = Object.keys(status).filter(
    (value) => status[value as keyof typeof status],
  );
  const partList = Object.keys(part).filter(
    (value) => part[value as keyof typeof part],
  );
  const size = totalCount().meta.count;

  const pageNumbers = [];
  for (let i = 1; i <= users.length / 10; i += 1) {
    pageNumbers.push(i);
  }

  // const { applies, isLoading, isError } = useApplyLists(
  // "https://jsonplaceholder.typicode.com/posts",
  // );

  // if (isLoading) {
  //   return <>is Loading</>;
  // }
  // if (isError) {
  //   return <>error</>;
  // }
  // const { count } = totalCount("https://randomuser.me/api/?results=5");

  const statusKeys = [
    "complete",
    "first-fail",
    "first-pass",
    "second-fail",
    "second-pass",
  ] as const;

  const statusNames = [
    "지원완료",
    "서류탈락",
    "서류합격",
    "면접탈락",
    "최종합격",
  ];
  const partKeys = ["design", "web", "server"] as const;
  const partNames = ["기획/디자인", "웹", "서버"];

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        status: statusList.join(":"),
        part: partList.join(":"),
        sort,
        page,
      },
    });
  }, [status, part, sort, page]);

  return (
    <>
      <Container>
        <Title>
          명지대(자연) <br />
          지원서 리스트
        </Title>
        <FilterContainer>
          <div>
            <span>현황</span>
            {statusKeys.map((s, i) => (
              <label htmlFor={s} key={s}>
                <input
                  type="checkbox"
                  name={s}
                  checked={status[s]}
                  onChange={(e) => {
                    setStatus({
                      ...status,
                      [s]: e.target.checked,
                    });
                  }}
                />
                {statusNames[i]}
              </label>
            ))}
          </div>
          <div>
            <span>직종</span>
            <div>
              {partKeys.map((p, i) => (
                <label htmlFor={p} key={p}>
                  <input
                    type="checkbox"
                    id={p}
                    checked={part[p]}
                    onChange={(e) => {
                      setPart({
                        ...part,
                        [p]: e.target.checked,
                      });
                    }}
                  />
                  {partNames[i]}
                </label>
              ))}
            </div>
          </div>
        </FilterContainer>
        <ApplyNum>지원자 {size}명</ApplyNum>
        <ApplySort>
          <ApplySelect
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
          >
            <option id="name_asc" value="name_asc">
              가나다순(오름차순)
            </option>
            <option id="name_desc" value="name_desc">
              가나다순(내림차순)
            </option>
            <option id="updatedAt_asc" value="updatedAt_asc">
              최신순(오름차순)
            </option>
            <option id="updatedAt_desc" value="updatedAt_desc">
              최신순(내림차순)
            </option>
          </ApplySelect>
          <SortPolygon />
        </ApplySort>

        <TableDiv>
          <TableContainer>
            <TableHeader>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>학과</th>
                <th>이메일</th>
                <th> </th>
              </tr>
            </TableHeader>
            <tbody>
              {users.map((s) => (
                <Line key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.major}</td>
                  <td>{s.email}</td>
                  <ApplyButton
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    지원서보기
                  </ApplyButton>
                </Line>
              ))}
            </tbody>
          </TableContainer>
          <PageNation>
            {pageNumbers.map((n, i) => (
              <PageLi
                key={n}
                onClick={() => {
                  setPage(n);
                }}
                selected={i + 1 === page}
              >
                {n}
              </PageLi>
            ))}
          </PageNation>
        </TableDiv>
      </Container>
      <Modal
        show={show}
        width={900}
        height={800}
        title="지원서보기"
        onClose={() => {
          setShow(false);
        }}
      >
        <Apply />
      </Modal>
    </>
  );
}

const Container = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white !important;

  padding: 12px;
`;

const Title = styled.h2`
  width: 100%;
  margin: 100px 0 32px 0;

  text-align: left;
  font-size: 40px;

  color: ${theme.colors.third.skyblue};
`;

const FilterContainer = styled.article`
  width: 100%;

  padding: 30px;
  border: 3px solid ${theme.colors.third.skyblue};

  > div {
    display: flex;
  }

  label {
    width: keep-all;
  }

  span {
    margin-right: 24px;
  }

  div + div {
    margin-top: 10px;
  }

  label + label {
    margin-left: 16px;
  }

  @media screen and (max-width: 424px) {
    div {
      flex-direction: column;
    }

    span {
      margin-bottom: 8px;
    }
  }
`;

const ApplyNum = styled.div`
  width: 100%;

  margin-top: 20px;

  font-size: 18px;
  font-weight: bold;
  text-align: right;
`;

const ApplySort = styled.div`
  width: 100%;
  margin-top: 20px;

  font-size: 16px;
  text-align: right;

  select {
    background: none;
    color: white;
    border: 0px;
  }
`;

const ApplySelect = styled.select`
  display: inline;
  background-color: none;
  color: #444;
  appearance: none;
`;

const TableDiv = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
`;

const TableContainer = styled.table`
  width: 100%;

  border-top: 5px solid ${theme.colors.third.skyblue};
  border-bottom: 1px solid ${theme.colors.third.skyblue};

  text-align: center;
  border-collapse: collapse;

  th,
  td {
    padding: 10px 0px;
  }
`;

const TableHeader = styled.thead`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.third.skyblue};
`;

const Line = styled.tr`
  width: 100%;

  font-size: 16px;

  border-bottom: 1px solid #28292a;
`;

const ApplyButton = styled.button`
  width: 70px;
  height: 30px;

  font-size: 13px;

  margin-top: 4px;

  border: none;
  outline: none;
  border-radius: 8px;

  color: white;
  background-color: rgba(0, 135, 209, 0.5);
`;

const PageNation = styled.ul`
  width: 100%;

  text-align: center;

  padding: 30px;
  font-size: 18px;
`;

const PageLi = styled.li<{ selected: boolean }>`
  display: inline-block;
  width: 20px;
  text-align: center;
  ${(props) => props.selected && `border-bottom: 3px solid #0087d1;`}

  &:hover {
    cursor: pointer;
  }
`;

export default ApplyLists;
