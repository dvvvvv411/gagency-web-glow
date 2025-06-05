
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle, Send, User, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Sie müssen der Datenschutzerklärung zustimmen",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ModernContactFormProps {
  onSuccess?: () => void;
}

export const ModernContactForm = ({ onSuccess }: ModernContactFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", values);
    setIsSubmitted(true);
    setIsSubmitting(false);
    form.reset();
    onSuccess?.();
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200/50 shadow-xl backdrop-blur-sm">
        <CardContent className="p-0 text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto mb-4 text-green-600 animate-bounce" size={64} />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-3">
            Vielen Dank für Ihre Nachricht!
          </h3>
          <p className="text-green-700 text-lg mb-6">
            Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            Neue Nachricht senden
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-md shadow-2xl border-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-blue-50/20 to-purple-50/30 pointer-events-none" />
      <CardContent className="relative p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            Schreiben Sie uns
          </h2>
          <p className="text-gray-600 text-lg">
            Lassen Sie uns Ihr Projekt besprechen und gemeinsam großartige Lösungen entwickeln.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="text-base font-semibold text-gray-700 group-focus-within:text-primary-600 transition-colors duration-200 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 text-base border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-primary-300"
                      placeholder="Ihr vollständiger Name"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="text-base font-semibold text-gray-700 group-focus-within:text-primary-600 transition-colors duration-200 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    E-Mail-Adresse *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="h-12 text-base border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-primary-300"
                      placeholder="ihre.email@beispiel.de"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="text-base font-semibold text-gray-700 group-focus-within:text-primary-600 transition-colors duration-200 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Ihre Nachricht *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      className="text-base border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-primary-300 resize-none"
                      placeholder="Erzählen Sie uns von Ihrem Projekt. Was sind Ihre Ziele und wie können wir Ihnen helfen?"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border-2 border-gray-100 p-4 bg-white/50 backdrop-blur-sm hover:border-primary-200 transition-all duration-300">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                      Datenschutzerklärung *
                    </FormLabel>
                    <p className="text-sm text-gray-600">
                      Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                      <a href="#" className="text-primary-600 hover:text-primary-700 underline transition-colors">
                        Datenschutzerklärung
                      </a>{" "}
                      zu.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Wird gesendet...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    Nachricht senden
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
