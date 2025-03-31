export const formatValue = {
  price: (price: number) => new Intl.NumberFormat("ko-KR").format(price), // 500,000
  phoneNumberOnlyNumber: (tel: string) => tel?.replace(/-/g, ""), // 01012345678
  phoneNumber: (tel: string) => formatPhoneNumber(tel),
};

const formatPhoneNumber = (value: string | undefined) => {
  const inputVal = value?.trim().replace(/[^0-9]/g, "");
  let formattedVal = inputVal;

  if (value === "") return;
  else {
    if (inputVal?.length === 9)
      formattedVal = inputVal.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    else if (inputVal?.length === 10)
      formattedVal = inputVal.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    else if (inputVal && inputVal?.length > 10)
      formattedVal = inputVal.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  return formattedVal;
};
