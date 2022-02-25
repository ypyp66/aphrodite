import useSWRImmutable from "swr/immutable";
import * as Cookie from "@lib/Cookie";
import { fetcher } from "@lib/Axios/fetcher";

function useQuestions(url: string) {
  const { data, error } = useSWRImmutable(url, fetcher);

  return {
    questions: data?.data.questions,
    isLoading: !data && !error,
    isError: error,
  };
}
export default useQuestions;
