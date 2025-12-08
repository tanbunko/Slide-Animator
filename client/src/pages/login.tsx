import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Loader2, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (data: { url: string; database: string; username: string; password: string }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData(e.currentTarget);
    loginMutation.mutate({
      url: formData.get('url') as string,
      database: formData.get('database') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    });
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
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="url">Server URL</Label>
                <Input 
                  id="url" 
                  name="url"
                  type="url" 
                  defaultValue="https://bepay-staging.social-design.group/"
                  required 
                  className="bg-white/50" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="database">Database</Label>
                <Input 
                  id="database" 
                  name="database"
                  type="text" 
                  placeholder="bepay-staging"
                  required 
                  className="bg-white/50" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">{t('login.email')}</Label>
                <Input 
                  id="username" 
                  name="username"
                  type="text" 
                  placeholder="admin"
                  required 
                  className="bg-white/50" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  required 
                  className="bg-white/50" 
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  t('login.submit')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
