import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import styles from './pages.module.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { ADD_MESSAGES_ENDPOINT, ADD_SHARES_ENDPOINT, END_ROUND_TWO_ENDPOINT, INTIATE_DKG_ENDPOINT, INTIATE_ROUND_TWO_ENDPOINT, RECONSTRUCT_SECRET_ENDPOINT } from '@/lib/endpoint';
const TEST_ACCESS_TOKEN = 'abcdefg';

interface Arrays {
    id: number,
    value: number[]
}

export function Demo() {

    const [secret, setSecret] = useState('')
    const [threshold, setThreshold] = useState(3)
    const [total, setTotal] = useState(5)
    const [PARTICIPANTS, setPARTICIPANTS] = useState([1, 2, 3, 4, 5])
    const [secretInPrimeField, setSecretInPrimeField] = useState('')
    useEffect(() => {
        const participants = []
        for (let i = 1; i <= total; i++) {
            participants.push(i)
        }
        setPARTICIPANTS(participants)
    }, [total])
    const [roundOneStates, setRoundOneStates] = useState<number[][]>([])
    const [roundOneMessages, setRoundOneMessages] = useState<number[][]>([])
    const [roundOneFinalStates, setRoundOneFinalStates] = useState<number[][]>([])
    const [roundTwoStates, setRoundTwoStates] = useState<number[][]>([])
    const [roundTwoFinalStates, setRoundTwoFinalStates] = useState<number[][]>([])
    const [shares, setShares] = useState<number[][]>([])
    const [finalShares, setFinalShares] = useState<number[][]>([])
    const [pks, setPks] = useState<number[][]>([])
    const [tks, setTks] = useState<number[][]>([])
    const { toast } = useToast()
    const [thresholdReached, setThresholdReached] = useState(false)
    const [thresholdShares, setThresholdShares] = useState<number[][]>([])
    const [reconstructedSecret, setReconstructedSecret] = useState('')
    const handleRoundOneClick = async (id: number) => {
        if (secret === '') {
            toast({
                title: "Error",
                description: "Please enter a secret",
                variant: "destructive"
            })
            return
        } else {
            const res = await axios.post(INTIATE_DKG_ENDPOINT, {
                secret: secret,
                id: id
            }, {
                headers: {
                    ACCESS_TOKEN: TEST_ACCESS_TOKEN
                }
            })
            const newState = [...roundOneStates]
            newState[id] = res.data.round1_state 
            const allMessages = [...roundOneMessages]
            allMessages[id] = res.data.round1_msg
            setRoundOneStates(newState)
            setRoundOneMessages(allMessages)
            setSecretInPrimeField(res.data.secret)
        }
    }

    const handleAddMessages = async (id: number) => {
        if (roundOneMessages.length < total) {
            toast({
                title: "Error",
                description: "Wait for all participants to finish round one",
                variant: "destructive"
            })
            return
        } else {
            const res = await axios.post(ADD_MESSAGES_ENDPOINT, {
                messages: roundOneMessages ,
                id: id,
                round1State: roundOneStates[id]
            }, {
                headers: {
                    ACCESS_TOKEN: TEST_ACCESS_TOKEN
                }
            })
            const newState = [...roundOneFinalStates]
            newState[id] = res.data.round1_state
            setRoundOneFinalStates(newState)
        }
    }

    const initiateRoundTwo = async (id:number) => {
        if (roundOneFinalStates.length < total) {
            toast({
                title: "Error",
                description: "Wait for all participants to finish round one",
                variant: "destructive"
            })
            return
        } else {
            const res = await axios.post(INTIATE_ROUND_TWO_ENDPOINT, {
                round1State: roundOneFinalStates[id],
            },{
                headers: {
                    ACCESS_TOKEN: TEST_ACCESS_TOKEN,
                }
            })
            const newState = [...roundTwoStates]
            newState[id] = res.data.round2_state
            setRoundTwoStates(newState)
            const newShares = [...shares]
            newShares[id] = res.data.shares
            setShares(newShares)
        }
    }
    const addShares = async (id:number) => {
        if (roundTwoStates.length < total && shares.length < total) {
            toast({
                title: "Error",
                description: "Wait for all participants to finish round two",
                variant: "destructive"
            })
        } else {
            const res = await axios.post(ADD_SHARES_ENDPOINT, {
                round2State: roundTwoStates[id],
                shares: shares,
                id: id
            },{
                headers: {
                    ACCESS_TOKEN: TEST_ACCESS_TOKEN,
                }
            })
            const newState = [...roundTwoFinalStates]
            newState[id] = res.data.round2_state
            setRoundTwoFinalStates(newState)
        }
    }

    const endRoundTwo = async (id:number) => {
        if (roundTwoFinalStates.length < total) {
            toast({
                title: "Error",
                description: "Wait for all participants to finish round two",
                variant: "destructive"
            })
        } else {
            const res = await axios.post(END_ROUND_TWO_ENDPOINT, {
                round2State: roundTwoFinalStates[id],
            },{
                headers: {
                    ACCESS_TOKEN: TEST_ACCESS_TOKEN,
                }
            })
            const newShares = [...finalShares]
            newShares[id] = res.data.shares
            setFinalShares(newShares)
            const newPks = [...pks]
            newPks[id] = res.data.pk
            setPks(newPks)
            const newTks = [...tks]
            newTks[id] = res.data.t_pk
            setTks(newTks)
        
        }
    }
    const addThresholdShares = async (id:number) => {
        if (finalShares.length < threshold) {
            setThresholdReached(false)
        } else {
            setThresholdReached(true)
        }
        const newShares = [...thresholdShares]
        newShares[id] = finalShares[id]
        setThresholdShares(newShares)
    }

    const reconstruct = async () => {
        if (thresholdShares.length < threshold) {
            toast({
                title: "Error",
                description: "Wait for all participants to finish round two",
                variant: "destructive"
            })
        }else {
            const res = await axios.post(RECONSTRUCT_SECRET_ENDPOINT, {
                shares: thresholdShares
            },{
                headers: {
                    ACCESS_TOKEN: TEST_ACCESS_TOKEN,
                }
            })
            setReconstructedSecret(res.data.reconstructed_share)
        }
    }
    return (
        <>
            <div className={`w-full h-screen flex flex-col gap-2 justify-center items-center ${styles.wave_bg}`}>
                <div className='flex gap-5'>
                    <Input
                        type={"text"}
                        placeholder={"Threshold"}
                        className='max-w-[150px]'
                        value={threshold}
                        onChange={(e) => setThreshold(Number(e.target.value))}
                    />
                    <Input
                        type={"text"}
                        placeholder={"Total"}
                        className='max-w-[150px]'
                        value={total}
                        onChange={(e) => setTotal(Number(e.target.value))}
                    />
                </div>
                <Input
                    type={"text"}
                    placeholder={"Enter your secret.... 🤫"}
                    className='max-w-[350px]'
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                />
                <div className='flex flex-wrap gap-2 justify-center align-center'>

                    {PARTICIPANTS.map((participant) => {
                        return (
                            <Card className="w-[350px] m-5">
                                <CardHeader>
                                    <CardTitle className='text-md'>Participant {participant}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-wrap gap-2'>
                                        <Button size={"sm"} variant={"outline"} onClick={()=>handleRoundOneClick(participant)}>Start Key Generation</Button>
                                        <Button size={"sm"} variant={"outline"} onClick={()=>handleAddMessages(participant)}>Add Messages</Button>
                                        <Button size={"sm"} variant={"outline"} onClick={()=>initiateRoundTwo(participant)}>Start Round Two</Button>
                                        <Button size={"sm"} variant={"secondary"} onClick={()=>endRoundTwo(participant)}>End Round Two</Button>
                                        <Button size={"sm"} variant={"default"} onClick={()=>addThresholdShares(participant)}>Add to Reconstruct Pool</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
                {thresholdReached && <Button onClick={reconstruct}>Reconstruct Secret</Button>}
            </div>
        </>
    )
}