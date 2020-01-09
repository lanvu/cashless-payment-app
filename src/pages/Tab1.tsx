import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonInput,
  IonButton,
  IonToast
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { fetchUserByEmail } from '../services/user'
import { useDispatch } from 'react-redux'
import { login } from '../features/loginStatus/loginStatusSlice'

const Tab1: React.FC = () => {
  const dispatch = useDispatch()

  let history = useHistory()
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const updateFormData = (event: any) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  const { email, password } = formData

  const handleLogin = () => {
    fetchUserByEmail(email)
      .then(res => {
        if (!['No user found', 'Internal sever error'].includes(res.message) && password === '123') {
          dispatch(login())
          history.push("/tab2/" + res.message.id)
        } else {
          setShowToast(true)
        }
      })
  }

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Login</IonCardTitle>
            <br />
            <IonItem>
              <IonLabel position="floating">Enter Email</IonLabel>
              <IonInput name="email" value={email} onIonChange={e => updateFormData(e)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Enter Password</IonLabel>
              <IonInput name="password" value={password} type="password" onIonChange={e => updateFormData(e)}></IonInput>
            </IonItem>
            <br />
            <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
          </IonCardContent>
        </IonCard>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login Unsuccessful!"
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
