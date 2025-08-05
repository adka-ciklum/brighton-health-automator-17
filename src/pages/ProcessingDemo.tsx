import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  FileText, 
  Mail, 
  Phone, 
  Database,
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Brain,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProcessingDemo = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);

  const processingSteps = [
    { label: 'Document Analysis', description: 'Scanning document structure and content' },
    { label: 'Data Extraction', description: 'Identifying patient and procedure information' },
    { label: 'Medical Necessity Check', description: 'Validating against clinical guidelines' },
    { label: 'Coverage Determination', description: 'Checking policy limits and benefit coverage' },
    { label: 'Cost Analysis', description: 'Comparing procedure cost vs coverage amount' },
    { label: 'Decision Generation', description: 'AI agent making final determination' },
    { label: 'Output Generation', description: 'Creating response documentation' }
  ];

  const sampleDocuments = [
    {
      id: 'doc1',
      name: 'PA_Request_MRI_Knee.pdf',
      type: 'PDF',
      size: '2.4 MB',
      icon: FileText,
      patient: 'John Smith',
      procedure: 'MRI - Right Knee',
      urgency: 'Routine',
      cost: 1250,
      coverage: 1000,
      diagnosis: 'M25.561 - Pain in right knee'
    },
    {
      id: 'doc2', 
      name: 'Email_PA_Surgery.eml',
      type: 'Email',
      size: '1.1 MB',
      icon: Mail,
      patient: 'Sarah Johnson',
      procedure: 'Arthroscopic Surgery',
      urgency: 'Urgent',
      cost: 4500,
      coverage: 3500,
      diagnosis: 'M23.21 - Derangement of medial meniscus'
    },
    {
      id: 'doc3',
      name: 'Fax_PA_Eye_Surgery.tiff',
      type: 'Fax',
      size: '3.2 MB', 
      icon: Phone,
      patient: 'Michael Davis',
      procedure: 'Retinal Surgery',
      urgency: 'Routine',
      cost: 1000,
      coverage: 300,
      diagnosis: 'H33.9 - Retinal detachment'
    }
  ];

  const handleProcessDocument = async (docId: string) => {
    setSelectedDocument(docId);
    setIsProcessing(true);
    setProcessingStep(0);
    setExtractedData(null);

    const doc = sampleDocuments.find(d => d.id === docId);
    
    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStep(i + 1);
      
      if (i === 1) {
        // Show extracted data after step 2
        setExtractedData({
          patient: doc?.patient,
          procedure: doc?.procedure,
          diagnosis: doc?.diagnosis,
          physician: 'Dr. Robert Wilson, MD',
          facility: 'Brighton Medical Center',
          insuranceId: 'BCBS-847362951',
          dateRequested: new Date().toLocaleDateString(),
          clinicalNotes: doc?.id === 'doc3' 
            ? 'Patient presents with retinal detachment requiring surgical intervention.'
            : doc?.id === 'doc2'
            ? 'Patient has meniscus tear confirmed by MRI. Failed conservative treatment.'
            : 'Patient reports persistent knee pain following sports injury. Conservative treatment unsuccessful.',
          confidence: 97,
          procedureCost: doc?.cost,
          coverageAmount: doc?.coverage,
          patientResponsibility: (doc?.cost || 0) - (doc?.coverage || 0),
          isFullyCovered: (doc?.cost || 0) <= (doc?.coverage || 0),
          approvalStatus: (doc?.cost || 0) <= (doc?.coverage || 0) ? 'approved' : 'partial'
        });
      }
    }

    // Final result
    setTimeout(() => {
      const isFullyCovered = (doc?.cost || 0) <= (doc?.coverage || 0);
      toast({
        title: isFullyCovered ? "PA Request Approved" : "PA Request Partially Approved",
        description: isFullyCovered 
          ? `Full authorization granted for ${doc?.patient} - ${doc?.procedure}`
          : `Partial authorization for ${doc?.patient} - Patient responsible for $${((doc?.cost || 0) - (doc?.coverage || 0)).toLocaleString()}`,
      });
      setIsProcessing(false);
    }, 500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for processing`,
      });
    }
  };

  const handleExportJSON = () => {
    if (!extractedData) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      patientInfo: {
        name: extractedData.patient,
        insuranceId: extractedData.insuranceId,
        dateRequested: extractedData.dateRequested
      },
      medicalInfo: {
        procedure: extractedData.procedure,
        diagnosis: extractedData.diagnosis,
        physician: extractedData.physician,
        facility: extractedData.facility,
        clinicalNotes: extractedData.clinicalNotes
      },
      coverageAnalysis: {
        procedureCost: extractedData.procedureCost,
        coverageAmount: extractedData.coverageAmount,
        patientResponsibility: extractedData.patientResponsibility,
        isFullyCovered: extractedData.isFullyCovered,
        approvalStatus: extractedData.approvalStatus
      },
      confidence: extractedData.confidence,
      processedBy: "PA Automation System v2.1"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PA_${extractedData.patient?.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "PA data exported as JSON file",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Live PA Processing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time prior authorization processing with AI automation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Upload/Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Input
                </CardTitle>
                <CardDescription>
                  Upload a new document or select from sample PA requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop your PA document or click to upload
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.tiff,.png,.jpg"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  or use sample documents below
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PA Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleDocuments.map((doc) => (
                  <div 
                    key={doc.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDocument === doc.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                    }`}
                    onClick={() => !isProcessing && handleProcessDocument(doc.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <doc.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.patient} - {doc.procedure}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={doc.urgency === 'Urgent' ? 'destructive' : 'secondary'}>
                          {doc.urgency}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{doc.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Processing Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Processing Status
                  {isProcessing && <RefreshCw className="h-4 w-4 animate-spin ml-auto" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {processingSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      processingStep > index ? 'bg-green-500' :
                      processingStep === index ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {processingStep > index ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : processingStep === index ? (
                        <RefreshCw className="h-3 w-3 text-white animate-spin" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        processingStep >= index ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {extractedData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Extracted Information
                  </CardTitle>
                  <CardDescription>
                    AI-extracted data with {extractedData.confidence}% confidence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">Patient</Label>
                      <p className="font-medium">{extractedData.patient}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Procedure</Label>
                      <p className="font-medium">{extractedData.procedure}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Diagnosis</Label>
                      <p className="font-medium">{extractedData.diagnosis}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Physician</Label>
                      <p className="font-medium">{extractedData.physician}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Insurance ID</Label>
                      <p className="font-medium">{extractedData.insuranceId}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Date Requested</Label>
                      <p className="font-medium">{extractedData.dateRequested}</p>
                    </div>
                  </div>
                   <div>
                     <Label className="text-xs text-muted-foreground">Clinical Notes</Label>
                     <p className="text-sm mt-1 p-2 bg-muted rounded">{extractedData.clinicalNotes}</p>
                   </div>
                   
                   {/* Coverage Analysis */}
                   <div className="border-t pt-3 mt-3">
                     <Label className="text-xs text-muted-foreground">Coverage Analysis</Label>
                     <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                       <div>
                         <Label className="text-xs text-muted-foreground">Procedure Cost</Label>
                         <p className="font-medium">${extractedData.procedureCost?.toLocaleString()}</p>
                       </div>
                       <div>
                         <Label className="text-xs text-muted-foreground">Insurance Coverage</Label>
                         <p className="font-medium">${extractedData.coverageAmount?.toLocaleString()}</p>
                       </div>
                       <div>
                         <Label className="text-xs text-muted-foreground">Patient Responsibility</Label>
                         <p className="font-medium">${extractedData.patientResponsibility?.toLocaleString()}</p>
                       </div>
                       <div>
                         <Label className="text-xs text-muted-foreground">Coverage Status</Label>
                         <Badge variant={extractedData.isFullyCovered ? 'default' : 'secondary'}>
                           {extractedData.isFullyCovered ? 'Fully Covered' : 'Partial Coverage'}
                         </Badge>
                       </div>
                     </div>
                     
                     <div className="mt-3 p-3 rounded-lg border">
                       <div className="flex items-center gap-2">
                         {extractedData.isFullyCovered ? (
                           <CheckCircle className="h-4 w-4 text-green-500" />
                         ) : (
                           <AlertTriangle className="h-4 w-4 text-orange-500" />
                         )}
                         <span className="font-medium">
                           {extractedData.approvalStatus === 'approved' ? 'APPROVED' : 'PARTIALLY APPROVED'}
                         </span>
                       </div>
                       <p className="text-xs text-muted-foreground mt-1">
                         {extractedData.isFullyCovered 
                           ? 'Procedure is fully covered by insurance plan'
                           : `Patient responsible for ${((extractedData.patientResponsibility / extractedData.procedureCost) * 100).toFixed(0)}% of total cost`
                         }
                       </p>
                     </div>
                   </div>
                   
                   <div className="flex justify-between items-center pt-2">
                     <Badge variant="outline">Confidence: {extractedData.confidence}%</Badge>
                     <Button size="sm" variant="outline" onClick={handleExportJSON}>
                       <Download className="h-4 w-4 mr-2" />
                       Export JSON
                     </Button>
                   </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingDemo;