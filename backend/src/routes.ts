import { CustomFastifyInstance } from "./types.js";
import { userRoutes } from "./routes/users.routes.js";
import { appointmentRoutes } from "./routes/appointments.routes.js";
import { registerAuthRoutes } from "./routes/register-auth-routes.js";

export async function registerRoutes(app: CustomFastifyInstance) {
  await registerAuthRoutes(app);
  await userRoutes(app);
  await appointmentRoutes(app);
}
