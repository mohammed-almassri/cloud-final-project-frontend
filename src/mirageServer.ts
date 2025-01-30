import { createServer, Response } from "miragejs";
import User from "./models/User";

export function makeServer() {
  const users: (User & { password: string })[] = [
    {
      id: "1",
      email: "test@test",
      name: "Test",
      password: "test",
      profileImage: "",
    },
  ];

  return createServer({
    routes() {
      this.namespace = "api";

      // Register (Sign Up)
      this.post("/register", (schema, request) => {
        const { email, name, password, profileImage } = JSON.parse(
          request.requestBody
        );

        // Check if the user already exists
        if (users.find((user) => user.email === email)) {
          return new Response(400, {}, { error: "User already exists" });
        }

        const newUser = {
          id: crypto.randomUUID(),
          email,
          name,
          password, // In real life, you'd hash this
          profileImage: profileImage || "",
        };

        users.push(newUser);
        return {
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            profileImage: newUser.profileImage,
          },
          token: "fake-jwt-token",
        };
      });

      // Login
      this.post("/login", (schema, request) => {
        console.log(request.requestBody);
        const { email, password } = JSON.parse(request.requestBody);
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          return new Response(401, {}, { error: "Invalid email or password" });
        }

        return {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
          },
          token: "fake-jwt-token",
        };
      });

      // Get Current User (Mock authentication)
      this.get("/user/:id", (schema, request) => {
        const userId = request.params.id;
        const user = users.find((u) => u.id === userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        //read token from header
        const token = request.requestHeaders.Authorization;
        if (token !== "Bearer fake-jwt-token") {
          return new Response(401, {}, { error: "Unauthorized" });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          profileImage: user.profileImage,
        };
      });

      // Update Profile
      this.put("/user/:id", (schema, request) => {
        const userId = request.params.id;
        const { name, profileImage } = JSON.parse(request.requestBody);
        const user = users.find((u) => u.id === userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        user.name = name || user.name;
        user.profileImage = profileImage || user.profileImage;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          profileImage: user.profileImage,
        };
      });
    },
  });
}
