interface ValidationI {
  [s: string]: (data: string) => {
    result: boolean;
    message: string;
  };
}

export const Validation: ValidationI = {
  email(data) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const result = regex.test(data);

    if (result) {
      return {
        result: true,
        message: "",
      };
    }
    return {
      result: false,
      message: "이메일 형식에 맞지 않습니다.",
    };
  },

  password(data) {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/i;

    const result = regex.test(data);

    if (result) {
      return {
        result: true,
        message: "",
      };
    }
    return {
      result: false,
      message: "비밀번호는 8~20자, 문자와 숫자, 특수문자를 포함해야합니다.",
    };
  },

  passwordConfirm(data) {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/i;

    const result = regex.test(data);

    if (result) {
      return {
        result: true,
        message: "",
      };
    }
    return {
      result: false,
      message: "비밀번호는 8~20자, 문자와 숫자, 특수문자를 포함해야합니다.",
    };
  },

  phone(data) {
    const regex = /^[0-9]{0,11}$/i;

    const result = regex.test(data);

    if (result) {
      return {
        result: true,
        message: "",
      };
    }
    return {
      result: false,
      message: "번호는 숫자만 입력 해주세요",
    };
  },

  name(data) {
    const regex = /^[가-힣]*$/g;

    const result = regex.test(data);

    if (result) {
      return {
        result: true,
        message: "",
      };
    }
    return {
      result: false,
      message: "이름은 한글만 가능합니다",
    };
  },

  major(data) {
    const regex = /^[ㄱ-ㅎ가-힣]*(과|학과|학부)$/gi;

    const result = regex.test(data);

    if (result) {
      return {
        result: true,
        message: "",
      };
    }
    return {
      result: false,
      message: "전공명은 과, 학과, 학부로 끝나야 합니다.",
    };
  },
};
