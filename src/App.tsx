
import {useState} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, HttpLink} from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import Student from './pages/Student';
import Advicer from './pages/Advicer';
import Admin from './pages/Admin';
import AdminFaculty from './pages/AdminFaculty';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';

const link = createHttpLink({
  // uri: "http://localhost:3000/graphql",
  uri: "https://projectadmin-production.up.railway.app/graphql",
  credentials: 'include'
});

const client = new ApolloClient({
  link,
  cache : new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Student" element={<Student/>}/>
            <Route path="/Advicer" element={<Advicer/>}/>
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/Admin/:id" element={<AdminFaculty/>}/>
            <Route path="/error" element={<ErrorPage/>}/>
          </Routes>
      </Router>
    </ApolloProvider>
  )
};

export default App;
