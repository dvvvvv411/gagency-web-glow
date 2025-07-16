import FluidBackground from '@/components/backgrounds/FluidBackground';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Calendar, Clock, CheckCircle, UserCheck } from 'lucide-react';

const LiveChat = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Start the Conversation",
      description: "Greet the visitor warmly and ask how you can help them today."
    },
    {
      icon: UserCheck,
      title: "Identify Their Needs",
      description: "Listen carefully to understand if they need recruitment services or have questions."
    },
    {
      icon: Calendar,
      title: "Offer Appointment Booking",
      description: "For interested candidates, direct them to our appointment booking system."
    },
    {
      icon: CheckCircle,
      title: "Follow Up",
      description: "Provide additional resources and ensure their questions are answered."
    }
  ];

  const tips = [
    "Always respond within 2-3 minutes during business hours",
    "Use a professional but friendly tone",
    "Have our services page ready to share links",
    "Guide visitors to the appointment booking page when appropriate",
    "Take note of frequently asked questions for future improvements"
  ];

  return (
    <FluidBackground variant="primary" className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Chat Support</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Live Chat
            <span className="block text-primary">Guidelines</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Complete guide for our team on how to effectively use live chat to assist visitors 
            and convert them into appointments.
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary">Employee Guide</Badge>
            <Badge variant="secondary">Best Practices</Badge>
            <Badge variant="secondary">Appointment Conversion</Badge>
          </div>
        </AnimatedSection>

        {/* Chat Widget Info */}
        <AnimatedSection className="mb-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Chat Widget</CardTitle>
              <CardDescription>
                The Crisp chat widget appears in the bottom-right corner of every page. 
                Visitors can click it to start a conversation with our team.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Widget is active on this page</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Steps Section */}
        <AnimatedSection className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conversation Flow
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these steps to ensure every visitor receives excellent support and guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Quick Tips */}
        <AnimatedSection className="mb-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Quick Tips for Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Key Actions */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Appointment Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  When a visitor shows interest in our services, guide them to book an appointment:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <code className="text-sm">
                    "I'd be happy to help you get started! You can book a consultation here: 
                    [website-url]/appointment-booking"
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Team Coordination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Ensure smooth handoffs and consistent service:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Share conversation history with team members</li>
                  <li>• Tag conversations appropriately</li>
                  <li>• Set follow-up reminders when needed</li>
                  <li>• Escalate complex queries to senior staff</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </FluidBackground>
  );
};

export default LiveChat;