const BASE_URL = 'http://0.0.0.0:8080/my/callback/';
const ROUND_ONE_URL = `${BASE_URL}roundOne`;
const ADD_MESSAGES_URL = `${BASE_URL}roundOne/addMessages`;
const INTIATE_ROUND_TWO_URL = `${BASE_URL}roundTwo/initiate`;
const ADD_SHARES_URL = `${BASE_URL}roundTwo/addShares`;
const END_ROUND_TWO_URL = `${BASE_URL}roundTwo/end`;

const TEST_ACCESS_TOKEN = 'abcdefhi'

import axios from 'axios';

(async () => {
    const messages: Uint8Array[] = []
    const round1_states: Uint8Array[] = []
    const round1_final_states: Uint8Array[] = []
    const round2_states: Uint8Array[] = []
    const round2_final_states: Uint8Array[] = []
    const shares: Uint8Array[] = []
    for (let i = 1; i <= 5; i++) {
        const roundOneResponse = await axios.post(ROUND_ONE_URL, {
            id: i
        }, {
            headers: {
                ACCESS_TOKEN: TEST_ACCESS_TOKEN
            }
        }
        );
        round1_states.push(roundOneResponse.data.round1_state)
        messages.push(roundOneResponse.data.round1_msg)
    }
    // console.log('round1_states', round1_states)
    // console.log('messages', messages)

    for (let i = 1; i <= 5; i++) {
        const addMessagesResponse = await axios.post(ADD_MESSAGES_URL, {
            id: i,
            messages: messages,
            round1State: round1_states[i-1]
        }, {
            headers: {
                ACCESS_TOKEN: TEST_ACCESS_TOKEN
            }
        });
        round1_final_states.push(addMessagesResponse.data.round1_state)
    }

    // console.log('round1_final_states', round1_final_states)

    for (let i = 0; i < 5; i++) {
        const initiateRoundTwoResponse = await axios.post(INTIATE_ROUND_TWO_URL, {
            round1State: round1_final_states[i]
        }, {
            headers: {
                ACCESS_TOKEN: TEST_ACCESS_TOKEN
            }
        });
        round2_states.push(initiateRoundTwoResponse.data.round2_state)
        shares.push(initiateRoundTwoResponse.data.shares)
    }
    // console.log('round2_states', round2_states)
    // console.log('shares', shares)

    for (let i = 1; i <= 5; i++) {
        const addSharesResponse = await axios.post(ADD_SHARES_URL, {
            id: i,
            shares: shares,
            round2State: round2_states[i-1]
        }, {
            headers: {
                ACCESS_TOKEN: TEST_ACCESS_TOKEN
            }
        });
        round2_final_states.push(addSharesResponse.data.round2_state)
    }
    // console.log('round2_final_states', round2_final_states)

    for (let i = 0; i < 5; i++) {
        const endRoundTwoResponse = await axios.post(END_ROUND_TWO_URL, {
            round2State: round2_final_states[i]
        }, {
            headers: {
                ACCESS_TOKEN: TEST_ACCESS_TOKEN
            }
        });
        console.log(endRoundTwoResponse.data)
    }
})()