import { io } from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL);