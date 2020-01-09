import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonButton, useIonViewWillEnter, IonSelect, IonSelectOption, IonListHeader } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { fetchCards } from '../services/cards'
import { fetchTransactions } from '../services/transactions'
import { useDispatch } from 'react-redux'
import { logout } from '../features/loginStatus/loginStatusSlice'

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
  const dispatch = useDispatch()

  let { user_id } = useParams()
  let limit = 4
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCardId, setSelectedCardId] = useState()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsPending, setTransactionsPending] = useState<Transaction[]>([])
  const [offset, setOffset] = useState(0)
  const [offsetPending, setOffsetPending] = useState(0)
  const [endOfList, setEndOfList] = useState(false)
  const [endOfListPending, setEndOfListPending] = useState(false)

  const updateList = (event: any) => {
    setSelectedCardId(event.target.value)
    setTransactions([])
    setOffset(0)
    setEndOfList(false)
    loadMore(event.target.value, 'complete')
    loadMore(event.target.value, 'pending')
  }

  const loadMore = (card_id: number, status: string) => {
    fetchTransactions(card_id, status, offset, limit)
      .then(res => {
        if (status === 'complete') {
          if (res.message !== 'No complete transaction found for card') {
            if (res.message.length < limit) {
              setTransactions(transactions => transactions.concat(res.message))
              setEndOfList(true)
            } else {
              setTransactions(transactions => transactions.concat(res.message.slice(0, -1)))
            }
            setOffset(offset + limit - 1)
          } else {
            // setShowToast(true)
          }
        } else {
          if (res.message !== 'No complete transaction found for card') {
            if (res.message.length < limit) {
              setTransactionsPending(transactionsPending => transactionsPending.concat(res.message))
              setEndOfListPending(true)
            } else {
              setTransactionsPending(transactionsPending => transactionsPending.concat(res.message.slice(0, -1)))
            }
            setOffsetPending(offsetPending + limit - 1)
          } else {
            // setShowToast(true)
          }
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
          {/* <IonButton slot='end' onClick={() => window.location.reload()}>
            Refresh
          </IonButton> */}
          <IonButton onClick={() => dispatch(logout())} slot='end' routerLink="/tab1">
            Logout
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Card</IonLabel>
          <IonSelect interface="popover" placeholder="Select Card" onIonChange={e => updateList(e)}>
            {cards.map((card, idx) => (
              <IonSelectOption key={idx} value={card.id}>{card.unique_id}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonList>
          <IonListHeader>
            Pending Transactions
          </IonListHeader>
          {transactionsPending.map((transaction, idx) => (
            <IonItem key={idx}>
              <IonLabel>Remaining amount: ${transaction.remaining_amount}. Vending machine ID: {transaction.vm_id}. Time: {new Date(transaction.timestamp).toLocaleString()}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        {transactionsPending.length > 0 && !endOfListPending &&
          <IonButton expand="block" onClick={() => loadMore(selectedCardId, 'pending')}>Load More</IonButton>
        }
        <IonList>
          <IonListHeader>
            Posted Transactions
          </IonListHeader>
          {transactions.map((transaction, idx) => (
            <IonItem key={idx}>
              <IonLabel>Remaining amount: ${transaction.remaining_amount}. Vending machine ID: {transaction.vm_id}. Time: {new Date(transaction.timestamp).toLocaleString()}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        {transactions.length > 0 && !endOfList &&
          <IonButton expand="block" onClick={() => loadMore(selectedCardId, 'complete')}>Load More</IonButton>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;