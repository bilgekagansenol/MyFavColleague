import React, { createContext, useState, useContext } from 'react';

const ActionsContext = createContext();

export const ActionsProvider = ({ children }) => {
  const [actions, setActions] = useState([
    {
      id: 1,
      title: 'Review project documentation',
      deadline: 'Bugün',
      completed: false
    },
    {
      id: 2,
      title: 'Prepare presentation for client meeting',
      deadline: 'Yarın',
      completed: false
    },
    {
      id: 3,
      title: 'Update sprint backlog',
      deadline: 'Bu Hafta',
      completed: false
    }
  ]);

  const toggleAction = (id) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, completed: !action.completed } : action
    ));
  };

  const addAction = (newAction) => {
    setActions([...actions, newAction]);
  };

  const deleteAction = (id) => {
    setActions(actions.filter(action => action.id !== id));
  };

  return (
    <ActionsContext.Provider value={{ actions, toggleAction, addAction, deleteAction }}>
      {children}
    </ActionsContext.Provider>
  );
};

export const useActions = () => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error('useActions must be used within an ActionsProvider');
  }
  return context;
}; 