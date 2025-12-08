import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema } from "@shared/schema";
import { authenticateOdoo } from "./odoo-client";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Odoo login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { url, database, username, password } = loginSchema.parse(req.body);

      const authResult = await authenticateOdoo(url, database, username, password);

      // Store user session
      if (req.session) {
        req.session.user = {
          uid: authResult.uid,
          username: authResult.username,
          database: authResult.database,
          odooUrl: url,
        };
      }

      res.json({
        success: true,
        user: {
          uid: authResult.uid,
          username: authResult.username,
          database: authResult.database,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : "Authentication failed",
      });
    }
  });

  // Check auth status
  app.get("/api/auth/me", (req, res) => {
    if (req.session?.user) {
      res.json({
        authenticated: true,
        user: req.session.user,
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session?.destroy((err) => {
      if (err) {
        res.status(500).json({ success: false, error: "Logout failed" });
      } else {
        res.json({ success: true });
      }
    });
  });

  return httpServer;
}
