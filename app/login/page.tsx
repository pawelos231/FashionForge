import { db } from "@lib/db";
const Login = async () => {
  const simples = await db.simple.findMany();
  return (
    <div>
      <div>login</div>
    </div>
  );
};

export default Login;
