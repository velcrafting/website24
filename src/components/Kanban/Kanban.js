import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../../firebase';
import { collection, query, where, onSnapshot, addDoc, writeBatch, doc } from 'firebase/firestore';
import { Box, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import debounce from 'lodash.debounce';

const MyKanban = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState({
    lanes: [
      { id: 'lane1', title: 'Not Started', cards: [], color: 'lightcoral' },
      { id: 'lane2', title: 'In Progress', cards: [], color: 'lightyellow' },
      { id: 'lane3', title: 'Completed', cards: [], color: 'lightgreen' },
    ],
  });

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'tasks'), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        updateTasks(tasks);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const updateTasks = useCallback((tasks) => {
    const lanes = {
      'Not Started': [],
      'In Progress': [],
      'Completed': []
    };

    tasks.forEach(task => {
      if (lanes[task.status]) {
        lanes[task.status].push(task);
      }
    });

    setData({
      lanes: Object.keys(lanes).map(status => ({
        id: status.toLowerCase().replace(' ', ''),
        title: status,
        cards: lanes[status],
        color: status === 'Not Started' ? 'lightcoral' : status === 'In Progress' ? 'lightyellow' : 'lightgreen'
      }))
    });
  }, []);

  const debouncedHandleDataChange = debounce(async (newData) => {
    if (currentUser) {
      const batch = writeBatch(db);
      newData.lanes.forEach(lane => {
        lane.cards.forEach(card => {
          const taskDoc = doc(db, 'tasks', card.id);
          batch.set(taskDoc, {
            title: card.title,
            description: card.description,
            status: lane.title,
            dueDate: card.dueDate,
            userId: currentUser.uid,
            color: lane.color
          });
        });
      });
      await batch.commit();
    }
  }, 1000);

  const handleDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newData = { ...data };

    const sourceLane = newData.lanes.find(lane => lane.id === source.droppableId);
    const destLane = newData.lanes.find(lane => lane.id === destination.droppableId);

    const [movedCard] = sourceLane.cards.splice(source.index, 1);
    destLane.cards.splice(destination.index, 0, movedCard);
    movedCard.status = destLane.title;

    setData(newData);
    debouncedHandleDataChange(newData);
  };

  const handleCardAdd = async (card, laneId) => {
    const lane = data.lanes.find(lane => lane.id === laneId);
    const newTask = {
      title: card.title,
      description: card.description || '',
      status: lane.title,
      dueDate: card.dueDate || '',
      userId: currentUser.uid,
      color: lane.color,
    };
    await addDoc(collection(db, 'tasks'), newTask);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, height: '100vh', overflow: 'auto' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            overflowX: 'hidden',
            height: '100%',
            width: '100%',
            boxSizing: 'border-box', // Ensure padding is included in width calculations
          }}
        >
          {data.lanes.map((lane) => (
            <Droppable key={lane.id} droppableId={lane.id}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    margin: { xs: '0 0 16px 0', lg: '0 16px 0 0' },
                    backgroundColor: lane.color,
                    borderRadius: 2,
                    padding: 2,
                    flexBasis: { xs: 'auto', lg: '0' },
                    flexGrow: 1,
                    width: { xs: '100%', lg: '300px' }, // Ensure lanes take full width on mobile/tablet and specific width on desktop
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: '22vh', lg: '66vh' }, // Desktop view height limit
                    overflowY: 'auto',
                    boxSizing: 'border-box',
                  }}
                >
                  <Typography variant="h6" sx={{ display: { xs: 'none', lg: 'block' } }}>{lane.title}</Typography>
                  {data.lanes.length > 0 && (
                    <Accordion sx={{ display: { xs: 'block', lg: 'none' } }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${lane.id}-content`}
                        id={`panel-${lane.id}-header`}
                      >
                        <Typography>{lane.title} ({lane.cards.length})</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ overflowY: 'auto', maxHeight: { xs: 'auto', lg: 'calc(100% - 32px)' } }}>
                          {lane.cards.map((card, index) => (
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                              {(provided) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{ marginBottom: 2, height: { xs: 'auto', sm: '100px' } }} // Adjust card height here
                                >
                                  <CardContent>
                                    <Typography variant="body1">{card.title}</Typography>
                                    <Typography variant="body2">{card.description}</Typography>
                                  </CardContent>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  )}
                  <Box sx={{ display: { xs: 'none', lg: 'block' }, overflowY: 'auto', maxHeight: 'calc(100% - 32px)' }}>
                    {lane.cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ marginBottom: 2, height: { xs: 'auto', sm: '120px' } }} // Adjust card height here
                          >
                            <CardContent>
                              <Typography variant="body1">{card.title}</Typography>
                              <Typography variant="body2">{card.description}</Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default MyKanban;
