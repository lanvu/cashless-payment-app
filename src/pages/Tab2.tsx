import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonButton, useIonViewWillEnter, IonSelect, IonSelectOption, IonListHeader } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { fetchCards } from '../services/cards'
import { fetchCompleteTransactions } from '../services/transactions'

interface Card {
  id: number
  unique_id: string
  amount: number
  user_id: number
  passcode: string
}

interface Transaction {
  card_id: number,
  vm_id: number,
  remaining_amount: number,
  timestamp: number,
  prev_vm_id: number,
  prev_remaining_amount: number,
  prev_timestamp: number,
  prev_transaction: number,
  complete: number,
}

const Tab2: React.FC = () => {
  let { user_id } = useParams()
  let limit = 2
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCardId, setSelectedCardId] = useState()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [offset, setOffset] = useState(0)
  const [endOfList, setEndOfList] = useState(false)

  const updateList = (event: any) => {
    setSelectedCardId(event.target.value)
    setTransactions([])
    setOffset(0)
    setEndOfList(false)
    loadMore(event.target.value)
  }

  const loadMore = (card_id: number) => {
    fetchCompleteTransactions(card_id, offset, limit)
      .then(res => {
        if (res.message !== 'No complete transaction found for card') {
          setTransactions(transactions => transactions.concat(res.message[0]))
          setOffset(offset + 1)
          if (res.message.length < limit) {
            setEndOfList(true)
          }
        } else {
          // setShowToast(true)
        }
      })
  }

  useIonViewWillEnter(() => {
    fetchCards(user_id)
      .then(res => {
        if (res.message !== 'No card found') {
          setCards(res.message)
        } else {
          // setShowToast(true)
        }
      })
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Cards</IonTitle>
          <IonButton slot='end' routerLink="/tab1">
            Logout
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Card</IonLabel>
          <IonSelect interface="popover" placeholder="Select Card" onIonChange={e => updateList(e)}>
            {cards.map((card, idx) => (
              <IonSelectOption key={idx} value={card.id}>...{card.unique_id.slice(-8)}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonList>
          <IonListHeader>
            Transactions
          </IonListHeader>
          {transactions.map((transaction, idx) => (
            <IonItem key={idx}>
              <IonLabel>Amount: ${transaction.remaining_amount}. Vending Machine ID: {transaction.vm_id}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        {transactions.length > 0 && !endOfList &&
          <IonButton expand="block" onClick={() => loadMore(selectedCardId)}>Load More</IonButton>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;