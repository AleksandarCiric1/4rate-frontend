const login = (data: number) => {
  sessionStorage.setItem("accountId", JSON.stringify(data));
};

const getUserAccountId = () => {
  const accountId = sessionStorage.getItem("accountId");
  return accountId ? JSON.parse(accountId) : null;
};

export { login, getUserAccountId };
