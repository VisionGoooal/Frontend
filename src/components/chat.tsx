import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Box, TextField, Button, List, ListItemText, Typography, IconButton, ListItemButton, ListItemAvatar, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icon for expand/collapse
// import userService from '../services/user-service';
import { User } from '../types/user';
import axiosInstance from "../Services/axiosConfig";

interface ChatMessage {
    senderId: string | undefined;
    message: string;
    timestamp: string; // or Date if you're working with a Date object
  }
const socket = io(import.meta.env.VITE_SERVER_API_URL); // your server URL


const Chat = () => {
  const theme = useTheme();
  const [users , setUsers] = useState<User[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<ChatMessage>({ senderId: '', message: '', timestamp: '' });
    const currentUser : User = JSON.parse(localStorage.getItem("user") || "{}");
  

  useEffect(() => {
    fetchUsers();
    socket.emit('userConnected', currentUser.id);
    socket.on('newMessage', (message: ChatMessage) => {
      if(message.senderId!=currentUser.id){
      setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
  },[])
  useEffect(() => {
    socket.on('chatHistory', (chatHistory: ChatMessage[]) => {
      // Set the chat history in the messages state
      setMessages(chatHistory);
    });
    if(selectedUser){
    socket.emit('getChatHistory', { senderId: currentUser.id, receiverId: selectedUser._id });
    }
    return () => {
      socket.off('chatHistory');
      socket.off('disconnect');

    };
  
}, [selectedUser]);

  const sendMessage = () => {
    if (newMessage.message.trim() && selectedUser) {
      // Emit the message to the selected user
      socket.emit('sendMessage', { receiverId: selectedUser._id , senderId : currentUser.id , message: newMessage.message });
      setMessages((prevMessages) => [...prevMessages, { ...newMessage }]);
      setNewMessage({ senderId: '', message: '', timestamp: '' });
    }
  };
    const fetchUsers = async () => {
        try{
            const response = await axiosInstance.get<User[]>(`/api/users/`);
            setUsers(response.data)
        }catch(err: any){
            console.error('Error fetching users:', err);
        }
    }
  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setMessages([]); // Clear previous messages when selecting a new user
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        bottom: 20,
        right: 20,
        width: isExpanded ? 300 : 50,
        height: isExpanded ? 400 : 50,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
        transition: 'width 0.3s, height 0.3s',
      }}
    >
      <Button
        color='secondary'
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          minWidth: 'auto',
          width: 40,
          height: 40,
        }}
      >
        {isExpanded ? <ExpandMoreIcon /> :
                    <IconButton >
                    <ChatBubbleOutlineIcon />
                </IconButton>
                    }
      </Button>

      {isExpanded && (
        <>
          {!selectedUser ? (
            // Display list of users
            <Box>
              
              <List>
                {users.filter((user) => user.id !== currentUser.id).map((user) => (

                  <ListItemButton
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemAvatar>
                    <Avatar
              src={user.profileImage || "/default-avatar.jpg"}
              alt={user.userFullName}
            />
                         </ListItemAvatar>
                    <ListItemText primary={user.userFullName} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          ) : (
            // Display chat interface for the selected user
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                  gap: 1,
                }}
              >
                
                <Avatar
              src={selectedUser.profileImage || "/default-avatar.jpg"}
              alt={selectedUser.userFullName}
            />
                <Typography marginTop={'5px'} variant="h6" flexGrow={1}>     
                    {selectedUser.userFullName}
                    </Typography>
                <Button
                  color="secondary"
                  onClick={() => setSelectedUser(null)}
                >
                 <ArrowBack/>
                </Button>
              </Box>
              <Box
                sx={{
                  overflowY: 'auto',
                  height: 200,
                  marginBottom: 2,
                }}
              >
                {messages.map((msg, index) => (
                  <Box key={index} sx={{ padding: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={msg.senderId === currentUser.id ? currentUser?.profileImage : selectedUser?.profileImage} />
                      <Box sx={{ display: 'flex',flexDirection : 'column', alignItems: 'flex-start' }}>
                      <Typography sx={{ marginLeft: 1, fontWeight: 'bold' }}>{msg.senderId === currentUser.id ? 'You' : selectedUser?.userFullName}</Typography>
                      <Typography sx={{ marginLeft: 1, fontSize: '0.8rem' }}>
                        {new Date(msg.timestamp).toLocaleString()}
                      </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ marginTop: 1 }}>{msg.message}</Typography>
                  </Box>
                ))}
              </Box>
              <TextField
                value={newMessage.message}
                onChange={(e) => setNewMessage({senderId : currentUser.id , message : e.target.value , timestamp : new Date().toISOString()})}
                placeholder="Type a message"
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: 1,
                }}
              />
              <Button
                onClick={sendMessage}
                variant="contained"
                fullWidth
              >
                Send
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Chat;