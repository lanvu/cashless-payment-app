import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTitle,
  IonContent,
  IonFooter,
  IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import { useSelector } from 'react-redux'
import { RootState } from '../app/rootReducer'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';

const App: React.FC = () => {
  const loginStatus = useSelector(
    (state: RootState) => state.loginStatus
  )

  return (
    <IonApp>
      <IonReactRouter>
        <IonContent>
          <IonRouterOutlet>
            <Route path="/tab1" component={Tab1} exact={true} />
            <Route path="/tab2/:user_id" component={Tab2} exact={true} />
            <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
          </IonRouterOutlet>
        </IonContent>

        <IonFooter>
          <IonToolbar>
            <IonTitle>Status: {loginStatus ? 'Logged In' : 'Logged Out'}</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
