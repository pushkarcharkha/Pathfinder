import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, MessageSquare, Link2, CheckCircle, XCircle, Edit, Save } from 'lucide-react';

interface Meeting {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  mentorId: string;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  topic: string;
  notes?: string;
  meetingLink?: string;
}

interface MeetingDetailsProps {
  meeting: Meeting;
  onBack: () => void;
  onUpdateStatus: (meetingId: string, status: 'scheduled' | 'completed' | 'cancelled') => Promise<boolean>;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({ meeting, onBack, onUpdateStatus }) => {
  const [notes, setNotes] = useState(meeting.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  
  const formattedDate = new Date(meeting.date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleSaveNotes = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, you would save the notes to the backend
      // For this demo, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the meeting object with the new notes
      meeting.notes = notes;
      
      setIsEditingNotes(false);
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleUpdateStatus = async (status: 'scheduled' | 'completed' | 'cancelled') => {
    setStatusUpdateLoading(true);
    
    try {
      const success = await onUpdateStatus(meeting._id, status);
      if (!success) {
        throw new Error('Failed to update meeting status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setStatusUpdateLoading(false);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors mr-4"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Meeting Details
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Meeting Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800">{meeting.topic}</h2>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(meeting.status)}`}>
                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
              </span>
            </div>
          </div>
          
          {/* Meeting Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Date & Time */}
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-indigo-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                    <p className="text-gray-900">{formattedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-indigo-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Time</h3>
                    <p className="text-gray-900">{meeting.timeSlot}</p>
                  </div>
                </div>
                
                {/* Student Info */}
                <div className="flex items-start">
                  <User className="h-5 w-5 text-indigo-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Student</h3>
                    <p className="text-gray-900">{meeting.userId.fullName}</p>
                    <p className="text-gray-500 text-sm">{meeting.userId.email}</p>
                  </div>
                </div>
                
                {/* Topic */}
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-indigo-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Topic</h3>
                    <p className="text-gray-900">{meeting.topic}</p>
                  </div>
                </div>
                
                {/* Meeting Link */}
                {meeting.meetingLink && (
                  <div className="flex items-start">
                    <Link2 className="h-5 w-5 text-indigo-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Meeting Link</h3>
                      <a 
                        href={meeting.meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500 underline"
                      >
                        {meeting.meetingLink}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Notes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                    
                    {!isEditingNotes ? (
                      <button
                        onClick={() => setIsEditingNotes(true)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveNotes}
                        disabled={isSaving}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  {isEditingNotes ? (
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[150px]"
                      placeholder="Add notes about this meeting..."
                      disabled={isSaving}
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 min-h-[150px]">
                      {notes ? (
                        <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
                      ) : (
                        <p className="text-gray-400 italic">No notes yet</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
                  
                  <div className="space-y-3">
                    {meeting.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus('completed')}
                          disabled={statusUpdateLoading}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="h-5 w-5" />
                          <span>Mark as Completed</span>
                        </button>
                        
                        <button
                          onClick={() => handleUpdateStatus('cancelled')}
                          disabled={statusUpdateLoading}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                        >
                          <XCircle className="h-5 w-5" />
                          <span>Cancel Meeting</span>
                        </button>
                      </>
                    )}
                    
                    {meeting.status === 'cancelled' && (
                      <button
                        onClick={() => handleUpdateStatus('scheduled')}
                        disabled={statusUpdateLoading}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                      >
                        <Calendar className="h-5 w-5" />
                        <span>Reschedule Meeting</span>
                      </button>
                    )}
                    
                    {meeting.status === 'completed' && (
                      <div className="text-center text-gray-500">
                        This meeting has been completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingDetails; 