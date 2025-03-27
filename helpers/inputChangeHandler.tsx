export const inputChangeHandler = (
  e: any,
  setState: any,
  name: string,
  isSimple?: boolean
) => {
  if (isSimple) {
    setState(e);
  } else {
    setState((prevState: any) => {
      return { ...prevState, [name]: e };
    });
  }
};
