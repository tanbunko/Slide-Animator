import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";
import { Database, Server, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  
  // Default values for Odoo connection
  const [serverUrl, setServerUrl] = useState("https://bepay-staging.social-design.group/");
  const [database, setDatabase] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation of Odoo login attempt
    console.log("Attempting to connect to Odoo XML-RPC...", {
      url: serverUrl,
      db: database,
      username: email
    });

    // In a real implementation with backend, this would call:
    // await fetch('/api/odoo/login', { method: 'POST', body: JSON.stringify({ url, db, username, password }) })
    
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Language Switcher Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-100/50 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md px-4"
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-primary">{t('login.title')}</CardTitle>
            <CardDescription>{t('login.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Odoo Connection Settings (Collapsible or visible) */}
              <div className="bg-gray-50 p-3 rounded-lg space-y-3 border border-gray-100">
                 <div className="space-y-2">
                    <Label htmlFor="server" className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <Server className="w-3 h-3" /> Server URL
                    </Label>
                    <Input 
                      id="server" 
                      value={serverUrl} 
                      onChange={(e) => setServerUrl(e.target.value)}
                      className="bg-white h-8 text-sm font-mono text-gray-600" 
                      readOnly
                    />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="database" className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <Database className="w-3 h-3" /> Database
                    </Label>
                    <Input 
                      id="database" 
                      placeholder="e.g. bepay_staging" 
                      value={database}
                      onChange={(e) => setDatabase(e.target.value)}
                      className="bg-white h-8 text-sm" 
                    />
                 </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  className="bg-white/50" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <a href="#" className="text-xs text-primary hover:underline">{t('login.forgotPassword')}</a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="bg-white/50" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  t('login.submit')
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              {t('login.noAccount')}{" "}
              <a href="#" className="text-primary hover:underline">
                {t('login.signup')}
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
