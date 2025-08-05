import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Database, 
  Mail, 
  Phone,
  FileText,
  Brain,
  Shield,
  Bell,
  Clock,
  Users,
  Save,
  TestTube,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ConfigurationSettings = () => {
  const [settings, setSettings] = useState({
    // AI Configuration
    confidenceThreshold: 85,
    autoApproveThreshold: 95,
    requireReviewThreshold: 80,
    
    // Integration Settings
    emailEnabled: true,
    faxEnabled: true,
    pdfUploadEnabled: true,
    ediEnabled: true,
    
    // Processing Rules
    prioritizeUrgent: true,
    businessHoursOnly: false,
    maxDailyProcessing: 1000,
    
    // Notification Settings
    emailNotifications: true,
    slackNotifications: false,
    smsAlerts: true,
    
    // Security Settings
    enableAuditLogging: true,
    requireTwoFactor: true,
    sessionTimeout: 30,
    
    // Custom Rules
    customCriteria: "High-cost procedures (>$10,000) require manual review\nExperimental treatments require physician approval\nOut-of-network providers trigger compliance check"
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved successfully",
      description: "Configuration changes have been applied",
    });
  };

  const handleTestConnection = (service: string) => {
    toast({
      title: `Testing ${service} connection`,
      description: "Running connectivity test...",
    });
    
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: `${service} integration is working properly`,
      });
    }, 2000);
  };

  const integrationStatus = [
    { name: 'Email Server (IMAP)', status: 'Connected', lastSync: '2 min ago', icon: Mail, color: 'text-green-500' },
    { name: 'Fax Gateway', status: 'Connected', lastSync: '5 min ago', icon: Phone, color: 'text-green-500' },
    { name: 'EHR System', status: 'Connected', lastSync: '1 min ago', icon: Database, color: 'text-green-500' },
    { name: 'EDI Processing', status: 'Warning', lastSync: '15 min ago', icon: FileText, color: 'text-yellow-500' }
  ];

  const aiModelSettings = [
    { name: 'Document Classification', accuracy: 99.2, status: 'Optimal', version: 'v2.1.0' },
    { name: 'Data Extraction', accuracy: 97.8, status: 'Good', version: 'v1.9.2' },
    { name: 'Medical Necessity', accuracy: 95.4, status: 'Good', version: 'v1.8.1' },
    { name: 'Policy Verification', accuracy: 98.1, status: 'Optimal', version: 'v2.0.3' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">System Configuration</h1>
            <p className="text-muted-foreground">Configure AI processing rules, integrations, and security settings</p>
          </div>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        <Tabs defaultValue="ai-config" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ai-config">AI Configuration</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="processing">Processing Rules</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-config" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Decision Thresholds
                  </CardTitle>
                  <CardDescription>
                    Configure confidence levels for automated decision making
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Minimum Confidence Threshold: {settings.confidenceThreshold}%</Label>
                    <Input
                      type="range"
                      min="50"
                      max="100"
                      value={settings.confidenceThreshold}
                      onChange={(e) => setSettings({...settings, confidenceThreshold: parseInt(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">
                      Requests below this threshold will be flagged for review
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Auto-Approve Threshold: {settings.autoApproveThreshold}%</Label>
                    <Input
                      type="range"
                      min="80"
                      max="100"
                      value={settings.autoApproveThreshold}
                      onChange={(e) => setSettings({...settings, autoApproveThreshold: parseInt(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">
                      Requests above this threshold will be automatically approved
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Require Review Threshold: {settings.requireReviewThreshold}%</Label>
                    <Input
                      type="range"
                      min="50"
                      max="95"
                      value={settings.requireReviewThreshold}
                      onChange={(e) => setSettings({...settings, requireReviewThreshold: parseInt(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">
                      Requests below this threshold require manual review
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Model Performance</CardTitle>
                  <CardDescription>Current model accuracy and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiModelSettings.map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium text-sm">{model.name}</p>
                        <p className="text-xs text-muted-foreground">Version {model.version}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{model.accuracy}%</div>
                        <Badge variant={model.status === 'Optimal' ? 'default' : 'secondary'}>
                          {model.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <TestTube className="h-4 w-4 mr-2" />
                    Run Model Validation
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Custom Processing Rules</CardTitle>
                <CardDescription>Define custom criteria for PA processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label>Custom Decision Criteria</Label>
                  <Textarea
                    value={settings.customCriteria}
                    onChange={(e) => setSettings({...settings, customCriteria: e.target.value})}
                    placeholder="Enter custom rules for PA processing..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Define specific rules for handling different types of PA requests
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Status</CardTitle>
                  <CardDescription>Current status of external system connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {integrationStatus.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <integration.icon className={`h-5 w-5 ${integration.color}`} />
                        <div>
                          <p className="font-medium text-sm">{integration.name}</p>
                          <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={integration.status === 'Connected' ? 'default' : 'destructive'}>
                          {integration.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleTestConnection(integration.name)}
                        >
                          Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Input Channel Settings</CardTitle>
                  <CardDescription>Enable/disable input channels for PA requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label>Email Processing</Label>
                    </div>
                    <Switch
                      checked={settings.emailEnabled}
                      onCheckedChange={(checked) => setSettings({...settings, emailEnabled: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <Label>Fax Processing</Label>
                    </div>
                    <Switch
                      checked={settings.faxEnabled}
                      onCheckedChange={(checked) => setSettings({...settings, faxEnabled: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <Label>PDF Upload</Label>
                    </div>
                    <Switch
                      checked={settings.pdfUploadEnabled}
                      onCheckedChange={(checked) => setSettings({...settings, pdfUploadEnabled: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <Label>EDI Processing</Label>
                    </div>
                    <Switch
                      checked={settings.ediEnabled}
                      onCheckedChange={(checked) => setSettings({...settings, ediEnabled: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="processing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Processing Rules
                </CardTitle>
                <CardDescription>Configure how PA requests are processed and prioritized</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Prioritize Urgent Requests</Label>
                        <p className="text-xs text-muted-foreground">Process urgent PA requests first</p>
                      </div>
                      <Switch
                        checked={settings.prioritizeUrgent}
                        onCheckedChange={(checked) => setSettings({...settings, prioritizeUrgent: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Business Hours Only</Label>
                        <p className="text-xs text-muted-foreground">Only process during business hours</p>
                      </div>
                      <Switch
                        checked={settings.businessHoursOnly}
                        onCheckedChange={(checked) => setSettings({...settings, businessHoursOnly: checked})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Maximum Daily Processing</Label>
                      <Input
                        type="number"
                        value={settings.maxDailyProcessing}
                        onChange={(e) => setSettings({...settings, maxDailyProcessing: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum number of PA requests to process per day
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure alerts and notifications for PA processing events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive email alerts for PA decisions</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Slack Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send notifications to Slack channels</p>
                  </div>
                  <Switch
                    checked={settings.slackNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, slackNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-xs text-muted-foreground">SMS alerts for urgent issues</p>
                  </div>
                  <Switch
                    checked={settings.smsAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, smsAlerts: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and compliance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Audit Logging</Label>
                        <p className="text-xs text-muted-foreground">Log all system activities</p>
                      </div>
                      <Switch
                        checked={settings.enableAuditLogging}
                        onCheckedChange={(checked) => setSettings({...settings, enableAuditLogging: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">Mandatory 2FA for all users</p>
                      </div>
                      <Switch
                        checked={settings.requireTwoFactor}
                        onCheckedChange={(checked) => setSettings({...settings, requireTwoFactor: checked})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Automatic logout after inactivity
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfigurationSettings;