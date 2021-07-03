import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuths';
import { database } from '../services/firebase';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle  } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    
   async function handleCreateRoom() {

        if(!user) {
            
           await signInWithGoogle();
        }

        history.push('/rooms/new');


    }

    async function handleJoinRoom(event: FormEvent) {

        event.preventDefault();

        if (roomCode.trim() === '') {

            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room not found.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`rooms/${roomCode}`);
      
    }

  
    return (
        <div id="page-auth">
            <aside>

                <img src={illustrationImg} alt="Illustration for Question and Answer" />
                <div className="media">
                <strong>Create Q&amp;A rooms in live</strong>
                <p>Your audience questions replied in real-time</p>
                </div>

            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Let me ask Logo" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google logo" />
                        Create your room with Google
                    </button>
                

                <div className="separator">or join an existing room</div>

                <form onSubmit={handleJoinRoom}>
                    <input 
                    type="text" 
                    placeholder="Type room's code here"
                    onChange={event => setRoomCode(event.target.value)}
                    value={roomCode}
                    />

                    <Button type="submit">
                        Join room
                    </Button>
                  
                </form>

                

                </div>
            </main>
        </div>
    )
}