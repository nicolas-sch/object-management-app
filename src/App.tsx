import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import SearchBar from './components/SearchBar';
import ObjectForm from './components/ObjectForm';
import RelationManager from './components/RelationManager';
import ObjectList from './components/ObjectList';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <h1>Object Management</h1>
        <SearchBar />
        <ObjectList />
        <ObjectForm />
        <RelationManager />
      </div>
    </AppProvider>
  );
}

export default App;
