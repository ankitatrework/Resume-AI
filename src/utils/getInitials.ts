const getInitials = (company: string) => {
  const names = company.split(" ");
  return (names[0]?.charAt(0) ?? "") + (names[1]?.charAt(0) ?? "");
};

export default getInitials;
