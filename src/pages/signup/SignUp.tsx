/* global window */
import { Button } from "@lib/DesignSystem/Button";
import { theme } from "@styles/theme";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Validation } from "@lib/etc/validation";

interface initialStateI {
  [s: string]: {
    email: string;
    password: string;
    passwordConfirm: string;
    mobile: string;
    school: string;
    major: string;
  };
}

interface actionI {
  type: string;
  payload: {
    name: string;
    value: string | string[];
  };
}

const INITIALSTATE = {
  user: {
    email: "",
    password: "",
    passwordConfirm: "",
    mobile: "",
    school: "",
    major: "",
  },
  error: {
    email: "",
    password: "",
    passwordConfirm: "",
    mobile: "",
    school: "",
    major: "",
  },
};

function reducer(state: initialStateI, action: actionI) {
  const { name, value } = action.payload;

  switch (action.type) {
    case "user":
      return { ...state, user: { ...state.user, [name]: value } };
    case "error":
      return { ...state, error: { ...state.error, [name]: value } };
    default:
      return state;
  }
}

function SignUp() {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE);
  const [termsOfUse, setTermsOfUse] = useState<boolean>(false);
  const router = useRouter();

  const { user, error } = state;
  const { email } = router.query;

  useEffect(() => {
    //임의로 접근할 경우 홈으로 리다이렉트
    if (!email) {
      alert("잘못된 접근 입니다");
      router.push("/");
    }

    if (email) {
      dispatch({
        type: "user",
        payload: { name: "email", value: email },
      });
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (Validation[name](value)) {
      dispatch({
        type: "user",
        payload: { name, value },
      });
    }
  }

  function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const { user } = state;

    if (name === "passwordConfirm") {
      if (user.password !== value) {
        handleErrorMsg({ name, value: "비밀번호와 일치하지 않습니다" });
      } else {
        handleErrorMsg({ name, value: "" });
      }
      return;
    }

    if (Validation[name](value)) {
      dispatch({
        type: "error",
        payload: { name, value: "" },
      });
    }
  }

  function handleErrorMsg({ name, value }: { name: string; value: string }) {
    // 메시지를 받으면
    // 해당하는 에러 key의 value로 넣어야함

    dispatch({
      type: "error",
      payload: { name, value },
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //학교, 학과에 대해 검증해야함
    e.preventDefault();

    const { user } = state;

    if (!user.school.endsWith("대학교")) {
      handleErrorMsg({ name: "school", value: "학교 이름을 확인해주세요" });
    }

    if (!user.major.endsWith("과" || "학과" || "학부")) {
      handleErrorMsg({ name: "major", value: "전공명을 확인해주세요" });
    }

    console.log(state);
    console.log("전송!");
  }

  function isValid() {
    const hasError =
      Object.values(state.error).filter((err) => err !== "").length > 0;

    const isEmpty =
      Object.values(state.user).filter((u) => u === "").length > 0;

    if (hasError || isEmpty) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Title>회원가입</Title>
      <InputGroup>
        <Input
          type="email"
          placeholder="이메일"
          defaultValue={email}
          disabled
        />

        <Input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={state.user.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          name="passwordConfirm"
          value={state.user.passwordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error.passwordConfirm && <ErrorMsg>{error.passwordConfirm}</ErrorMsg>}
        <Input
          type="text"
          placeholder="휴대폰 번호 (ex.01012345678)"
          name="mobile"
          value={state.user.mobile}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="학교 (ex.명지대학교)"
          name="school"
          value={state.user.school}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error.school && <ErrorMsg>{error.school}</ErrorMsg>}
        <Input
          type="text"
          placeholder="전공 (ex.컴퓨터공학과)"
          name="major"
          value={state.user.major}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error.major && <ErrorMsg>{error.major}</ErrorMsg>}
      </InputGroup>
      <label htmlFor="termsOfUse">
        <input
          type="checkbox"
          id="termsOfUse"
          onChange={() => {
            setTermsOfUse(!termsOfUse);
          }}
        />{" "}
        이용약관에 동의 합니다
      </label>
      <Button
        type="submit"
        fullWidth
        color={theme.colors.third.skyblue}
        size="large"
        disabled={isValid() || !termsOfUse}
        onClick={() => {}}
      >
        회원가입
      </Button>
    </Container>
  );
}

const Container = styled.form`
  width: 100%;
  max-width: 334px;
  height: 100%;

  margin: 0 auto;
  padding: 20px;

  button {
    margin-top: 20px;
    font-size: 14px;
    padding: 12px 0px;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 24px;
`;

const InputGroup = styled.div`
  margin: 20px 0px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;

  border: 0;
  border-radius: 6px;
  background-color: ${theme.colors.primary.gray};

  font-size: 17px;
  letter-spacing: -0.2px;

  outline-color: #8ffcff;
  color: #a0a0a0;

  padding-left: 16px;

  & + & {
    margin-top: 15px;
  }
`;

const ErrorMsg = styled.p`
  padding: 6px 0px;
  color: ${theme.colors.primary.orange};
`;

export default SignUp;
