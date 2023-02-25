// import { serialize } from "cookie";
// import { encode } from "@/lib/jwt";

// const authUser = (email, password) => {
//   const validEmail = "powerlsh0103@gmail.com";
//   const validPassword = "123qwe!!";

//   if (email === validEmail || password === validPassword) {
//     return encode({
//       id: "32pd323",
//       name: "Ssung",
//       email: "powerlsh0103@gmail.com",
//     });
//   }

//   return null;
// };

// // eslint-disable-next-line import/no-anonymous-default-export
// export default (req, res) => {
//   const { method } = req;
//   const { email, password } = req.body;

//   if (method !== "POST") {
//     return res.status(404).end();
//   }

//   if (!email || !password) {
//     return res.status(401).json({
//       error: "Missing required parameters",
//     });
//   }

//   const user = authUser(email, password);

//   if (user) {
//     res.setHeader(
//       "Set-Cookie",
//       serialize("my_auth", user, { path: "/", httpOnly: true })
//     );
//     return res.json({ success: true });
//   } else {
//     return res.status(401).json({
//       success: false,
//       error: "Wrong email or password",
//     });
//   }
// };
