import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  BarChart3,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const metrics = [
    {
      title: 'Total Processed Today',
      value: '342',
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'Average Processing Time',
      value: '2.3 min',
      change: '-18%',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      title: 'Approval Rate',
      value: '94.2%',
      change: '+3%',
      trend: 'up', 
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Cost Savings',
      value: '$15,240',
      change: '+$2,100',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500'
    }
  ];

  const recentActivity = [
    { time: '2 min ago', patient: 'J. Smith', procedure: 'MRI Knee', status: 'Approved', confidence: 98 },
    { time: '5 min ago', patient: 'M. Johnson', procedure: 'CT Scan', status: 'Approved', confidence: 95 },
    { time: '8 min ago', patient: 'R. Davis', procedure: 'Surgery', status: 'Review', confidence: 85 },
    { time: '12 min ago', patient: 'S. Wilson', procedure: 'Physical Therapy', status: 'Approved', confidence: 97 },
    { time: '15 min ago', patient: 'A. Brown', procedure: 'Ultrasound', status: 'Approved', confidence: 99 }
  ];

  const channelStats = [
    { channel: 'Email', count: 156, percentage: 45, color: 'bg-blue-500' },
    { channel: 'Fax', count: 98, percentage: 28, color: 'bg-green-500' },
    { channel: 'PDF Upload', count: 67, percentage: 19, color: 'bg-purple-500' },
    { channel: 'EDI', count: 21, percentage: 8, color: 'bg-orange-500' }
  ];

  const weeklyData = [
    { day: 'Mon', processed: 285, approved: 268, denied: 17 },
    { day: 'Tue', processed: 321, approved: 301, denied: 20 },
    { day: 'Wed', processed: 298, approved: 282, denied: 16 },
    { day: 'Thu', processed: 342, approved: 322, denied: 20 },
    { day: 'Fri', processed: 389, approved: 366, denied: 23 },
    { day: 'Sat', processed: 156, approved: 148, denied: 8 },
    { day: 'Sun', processed: 134, approved: 127, denied: 7 }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Real-time insights into PA processing performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 7 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                  )}
                  {metric.change} from yesterday
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="channels">Input Channels</TabsTrigger>
            <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Processing Volume</CardTitle>
                  <CardDescription>PA requests processed per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 text-sm font-medium">{day.day}</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Processed: {day.processed}</span>
                            <span className="text-green-500">Approved: {day.approved}</span>
                          </div>
                          <Progress value={(day.approved / day.processed) * 100} className="h-2" />
                        </div>
                        <div className="text-sm text-muted-foreground w-16 text-right">
                          {Math.round((day.approved / day.processed) * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest PA processing results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium text-sm">{activity.patient} - {activity.procedure}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs">
                          {activity.confidence}%
                        </div>
                        <Badge variant={activity.status === 'Approved' ? 'default' : 'secondary'}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Speed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Time</span>
                      <span className="font-mono">2.3 min</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fastest Process</span>
                      <span className="font-mono">45 sec</span>
                    </div>
                    <Progress value={95} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target Time</span>
                      <span className="font-mono">3.0 min</span>
                    </div>
                    <Progress value={75} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accuracy Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>OCR Accuracy</span>
                      <span className="font-mono">99.7%</span>
                    </div>
                    <Progress value={99.7} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Extraction</span>
                      <span className="font-mono">97.2%</span>
                    </div>
                    <Progress value={97.2} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Decision Accuracy</span>
                      <span className="font-mono">98.5%</span>
                    </div>
                    <Progress value={98.5} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Gains</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">75%</div>
                    <p className="text-sm text-muted-foreground">Faster Processing</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">60%</div>
                    <p className="text-sm text-muted-foreground">Staff Reduction</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">94%</div>
                    <p className="text-sm text-muted-foreground">Automation Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Channel Distribution</CardTitle>
                <CardDescription>PA requests by submission method (last 7 days)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {channelStats.map((channel, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{channel.channel}</span>
                      <span className="text-sm text-muted-foreground">{channel.count} requests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={channel.percentage} className="flex-1" />
                      <span className="text-sm font-medium w-12">{channel.percentage}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Manual Processing Cost</span>
                      <span className="font-mono">$45/request</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Automated Processing Cost</span>
                      <span className="font-mono">$2.50/request</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Savings per Request</span>
                      <span className="font-mono text-green-500">$42.50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projected Annual Savings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-500">$2.3M</div>
                    <p className="text-muted-foreground">Based on current volume</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Processing cost reduction</span>
                      <span>$1.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Staff reallocation savings</span>
                      <span>$400K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error reduction savings</span>
                      <span>$100K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;