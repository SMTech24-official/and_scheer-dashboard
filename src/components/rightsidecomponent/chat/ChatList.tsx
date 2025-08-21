import React, { useState, useEffect } from 'react';
import { useGetAllChatListQuery } from "../../../redux/features/chat/chatSlice";
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

export default function ChatList() {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [info, setInfo] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: getList } = useGetAllChatListQuery({});
  const chatList = getList?.data?.data;

  useEffect(() => {
    if (chatList) {
      setInfo(chatList);
    }
  }, [getList?.data?.data]);

  const handleChatSelect = (room: any) => {
    setSelectedChat(room);
  };

  const calculateDaysLeft = (deadline: string) => {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const differenceInTime = deadlineDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.ceil(differenceInDays);
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const messageDate = new Date(date);
    if (isToday(messageDate)) {
      return format(messageDate, 'HH:mm');
    } else if (isYesterday(messageDate)) {
      return 'Yesterday';
    } else if (differenceInDays(new Date(), messageDate) < 7) {
      return format(messageDate, 'EEE');
    } else {
      return format(messageDate, 'dd MMM yy');
    }
  };

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft <= 0) return 'bg-red-100 text-red-800';
    if (daysLeft <= 3) return 'bg-amber-100 text-amber-800';
    return 'bg-emerald-100 text-emerald-800';
  };

  // Filter and search functionality
  const filteredChats = chatList?.filter((room: any) => {
    const matchesSearch = room.jobPost?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.participants.some((user: any) => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    if (filterStatus === 'all') return matchesSearch;
    
    const daysLeft = calculateDaysLeft(room.lastActivity);
    if (filterStatus === 'urgent') return matchesSearch && daysLeft <= 3;
    if (filterStatus === 'active') return matchesSearch && daysLeft > 3;
    
    return matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="lg:w-96 w-full h-72 sm:h-80 lg:h-full overflow-y-auto bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
          
          {/* Search input */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter buttons */}
          <div className="flex space-x-2 mb-4">
            <button 
              className={`px-3 py-1 cursor-pointer text-xs rounded-full ${filterStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            {/* <button 
              className={`px-3 py-1 text-xs rounded-full ${filterStatus === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setFilterStatus('urgent')}
            >
              Urgent
            </button> */}
            <button 
              className={`px-3 py-1 cursor-pointer text-xs rounded-full ${filterStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setFilterStatus('active')}
            >
              Active
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredChats?.length > 0 ? (
            filteredChats.map((room:any) => {
              const daysLeft = calculateDaysLeft(room.lastActivity);
              const isActive = selectedChat?.id === room.id;
              
              return (
                <div
                  key={room.id}
                  className={`cursor-pointer p-4 transition-colors ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => handleChatSelect(room)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 truncate max-w-[70%]">{room.jobPost?.title}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(room.lastActivity)}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    {room.participants.map((user: any) => (
                      <div key={user.id} className="text-sm text-gray-600 flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${user.role === "EMPLOYEE" ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                        {user.role === "EMPLOYEE" ? 'Employer' : 'Job Seeker'}: {user.fullName}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 truncate max-w-[70%]">
                      {/* Fixed: Access the message text from the lastMessage object */}
                      {room.lastMessage?.message || "No messages yet"}
                    </span>
                    {room.jobPost?.deadline && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(daysLeft)}`}>
                        {daysLeft > 0 ? `${daysLeft}d left` : 'Expired'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* Chat Viewer */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedChat.jobPost?.title}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="text-blue-500 mr-1">•</span> 
                  {selectedChat.jobPost?.company?.companyName}
                </p>
              </div>
              
              <div className="flex items-center">
                {selectedChat.jobPost?.deadline && (
                  <span className={`text-xs px-2 py-1 rounded-full mr-2 ${getStatusColor(calculateDaysLeft(selectedChat.lastActivity))}`}>
                    {calculateDaysLeft(selectedChat.lastActivity) > 0 
                      ? `${calculateDaysLeft(selectedChat.lastActivity)} days left` 
                      : 'Expired'}
                  </span>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="max-w-3xl mx-auto space-y-4">
                {selectedChat.messages?.length > 0 ? (
                  selectedChat.messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender.role === 'EMPLOYEE' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[75%] p-3 rounded-xl ${message.sender.role === 'EMPLOYEE' ? 'bg-white border border-gray-200' : 'bg-blue-500 text-white'}`}>
                        <div className="font-medium text-sm mb-1">{message.sender.fullName}</div>
                        <div className="text-sm mb-1">
                          {/* Fixed: Directly rendering the message text */}
                          {message.message}
                        </div>
                        <div className={`text-xs ${message.sender.role === 'EMPLOYEE' ? 'text-gray-500' : 'text-blue-100'}`}>
                          {format(new Date(message.createdAt), 'HH:mm • dd MMM yyyy')}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="mt-4">No messages yet</p>
                    <p className="text-sm">Start a conversation by sending a message</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                {/* <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg font-medium">
                  Send
                </button> */}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8">
            <svg className="w-24 h-24 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
            <p className="text-center max-w-md">Choose a chat from the sidebar to view messages or start a new conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
}