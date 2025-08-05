import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock,
  Shield,
  Brain,
  Zap,
  TrendingUp,
  Database,
  Lock,
  ArrowRight,
  Play
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [completedCount, setCompletedCount] = useState(247);
  const [automationRate] = useState(94);

  const handleQuickOverview = () => {
    toast({
      title: "Quick Overview",
      description: "Navigate to Live Processing to see the platform in action",
    });
  };

  const platformFeatures = [
    {
      title: "Live PA Processing",
      description: "Real-time document processing with AI agents",
      icon: Brain,
      link: "/process",
      highlight: "Live Processing"
    },
    {
      title: "Analytics Dashboard", 
      description: "View processing metrics, ROI calculations, and performance data",
      icon: TrendingUp,
      link: "/analytics",
      highlight: "Real-time Data"
    },
    {
      title: "Security Monitor",
      description: "See how PII/PHI protection works with private LLM deployment",
      icon: Shield,
      link: "/security", 
      highlight: "Privacy First"
    },
    {
      title: "System Configuration",
      description: "Configure AI thresholds, integrations, and processing rules",
      icon: Database,
      link: "/settings",
      highlight: "Customizable"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Agentic PA Automation
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure, AI-powered Prior Authorization processing that handles all input formats while protecting PII/PHI data
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/process">
              <Button size="lg" className="animate-pulse">
                <Play className="h-5 w-5 mr-2" />
                Start Processing
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={handleQuickOverview}>
              Quick Overview
            </Button>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{automationRate}%</div>
              <Progress value={automationRate} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 min</div>
              <p className="text-xs text-muted-foreground">-75% reduction</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.3M</div>
              <p className="text-xs text-muted-foreground">Projected ROI</p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo Features */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Experience the Platform</h2>
            <p className="text-muted-foreground">Click any feature below to see it in action</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformFeatures.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <Badge variant="outline">{feature.highlight}</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {feature.title}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to See It in Action?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience how our agentic automation can transform your prior authorization workflow while keeping your data secure
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/process">
                <Button size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start Processing
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule Technical Deep Dive
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;