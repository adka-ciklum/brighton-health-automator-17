import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Key,
  Zap,
  RefreshCw
} from 'lucide-react';

const SecurityMonitor = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [threatsBlocked, setThreatsBlocked] = useState(0);

  useEffect(() => {
    // Simulate real-time security monitoring
    const interval = setInterval(() => {
      setThreatsBlocked(prev => prev + Math.random() > 0.7 ? 1 : 0);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const securityMetrics = [
    {
      title: 'Threats Blocked Today',
      value: '247',
      icon: Shield,
      color: 'text-red-500',
      status: 'Active Protection'
    },
    {
      title: 'PII/PHI Instances Secured',
      value: '15,642',
      icon: Lock,
      color: 'text-green-500',
      status: 'All Protected'
    },
    {
      title: 'Access Attempts',
      value: '1,293',
      icon: Users,
      color: 'text-blue-500',
      status: 'All Authenticated'
    },
    {
      title: 'Compliance Score',
      value: '99.8%',
      icon: CheckCircle,
      color: 'text-green-500',
      status: 'HIPAA Compliant'
    }
  ];

  const privacyFeatures = [
    {
      title: 'Private LLM Deployment',
      description: 'AI models run exclusively in your secure environment',
      status: 'Active',
      icon: Database,
      details: [
        'No data sent to external APIs',
        'On-premise model execution',
        'Custom model fine-tuning available'
      ]
    },
    {
      title: 'End-to-End Encryption',
      description: 'All data encrypted in transit and at rest',
      status: 'Active',
      icon: Lock,
      details: [
        'AES-256 encryption standard',
        'TLS 1.3 for data in transit',
        'Hardware security modules (HSM)'
      ]
    },
    {
      title: 'PII/PHI Detection',
      description: 'Real-time identification and protection of sensitive data',
      status: 'Active',
      icon: Eye,
      details: [
        '99.7% detection accuracy',
        'Automatic data masking',
        'Pattern recognition algorithms'
      ]
    },
    {
      title: 'Zero Data Retention',
      description: 'No patient data stored beyond processing time',
      status: 'Active',
      icon: RefreshCw,
      details: [
        'Automatic data purging',
        'Processing-only storage',
        'Audit trail maintained'
      ]
    }
  ];

  const recentSecurityEvents = [
    {
      time: '2 min ago',
      event: 'PII detected and masked in PA request',
      type: 'Data Protection',
      severity: 'Info',
      details: 'SSN automatically redacted from fax submission'
    },
    {
      time: '8 min ago',
      event: 'Failed authentication attempt blocked',
      type: 'Access Control', 
      severity: 'Warning',
      details: 'Invalid credentials from IP 192.168.1.100'
    },
    {
      time: '15 min ago',
      event: 'Encryption validation completed',
      type: 'Data Security',
      severity: 'Info',
      details: 'All data streams verified encrypted'
    },
    {
      time: '23 min ago',
      event: 'Compliance audit passed',
      type: 'Compliance',
      severity: 'Success',
      details: 'HIPAA compliance check successful'
    },
    {
      time: '31 min ago',
      event: 'Unusual access pattern detected',
      type: 'Anomaly Detection',
      severity: 'Warning',
      details: 'High volume requests from single user - investigating'
    }
  ];

  const complianceChecks = [
    { name: 'HIPAA Privacy Rule', status: 'Compliant', lastCheck: '2 hours ago', score: 100 },
    { name: 'HIPAA Security Rule', status: 'Compliant', lastCheck: '2 hours ago', score: 100 },
    { name: 'SOC 2 Type II', status: 'Compliant', lastCheck: '1 day ago', score: 99 },
    { name: 'GDPR (EU Data)', status: 'Compliant', lastCheck: '6 hours ago', score: 100 },
    { name: 'State Privacy Laws', status: 'Compliant', lastCheck: '4 hours ago', score: 98 }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Security & Privacy Monitor</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring of data protection, privacy compliance, and security threats
          </p>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Privacy Features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Privacy Protection Features
                </CardTitle>
                <CardDescription>
                  Built-in safeguards for PII/PHI data protection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {privacyFeatures.map((feature, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <feature.icon className="h-4 w-4 text-primary" />
                        <span className="font-medium">{feature.title}</span>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                    <ul className="text-xs space-y-1">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Security Events */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Recent Security Events
                </CardTitle>
                <CardDescription>
                  Live security monitoring and threat detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSecurityEvents.map((event, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{event.event}</span>
                      <Badge 
                        variant={
                          event.severity === 'Success' ? 'default' :
                          event.severity === 'Warning' ? 'destructive' :
                          'secondary'
                        }
                        className="text-xs"
                      >
                        {event.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                      <span>•</span>
                      <span>{event.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.details}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Compliance Status
                </CardTitle>
                <CardDescription>
                  Regulatory compliance monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{check.name}</p>
                      <p className="text-xs text-muted-foreground">Last check: {check.lastCheck}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-green-500 border-green-500 mb-1">
                        {check.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">Score: {check.score}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Flow Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-purple-500" />
              Data Processing Security Flow
            </CardTitle>
            <CardDescription>
              How your sensitive data is protected at every step
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: 'Input Received', security: 'TLS 1.3 Encryption', icon: FileText },
                { step: 'PII Detection', security: 'Real-time Scanning', icon: Eye },
                { step: 'Data Masking', security: 'Automatic Redaction', icon: Shield },
                { step: 'AI Processing', security: 'Private Model Only', icon: Zap },
                { step: 'Output Generated', security: 'Zero Retention', icon: RefreshCw }
              ].map((step, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <step.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium text-sm mb-1">{step.step}</h4>
                  <p className="text-xs text-muted-foreground">{step.security}</p>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityMonitor;