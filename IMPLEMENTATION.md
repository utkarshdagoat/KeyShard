# Implementation and adoption of the FROST key generation protocol in KeyShard
### FROST Key Generation Implementation


### Main Functions


1. **Round 1 Initiation**: 
    - Each participant starts Round 1 by generating their initial state and message.
    - The `dkg_part1` function is called for each participant, storing the resulting states and messages.

2. **Round 1 Message Combination**:
    - Each participant processes the messages received from others to update their state.
    - The `combine_round1_msgs` function is called to combine the messages for each participant, finalizing their Round 1 state.

3. **Round 2 Initiation**:
    - Each participant transitions to Round 2 using their finalized Round 1 state.
    - The `intiate_round2` function is called to generate the Round 2 state and shares.

4. **Round 2 Share Addition**:
    - Participants exchange and process the shares received from others.
    - The `add_shares` function is called to add shares to each participant's Round 2 state.

5. **Round 2 Completion**:
    - Each participant finalizes their Round 2 state to produce their share of the secret key.
    - The `end_round2` function is called to complete Round 2 and produce the final shares.

6. **Secret Reconstruction**:
    - The final shares are combined to reconstruct the original secret.
    - The `reconstruct_share` function is called to verify the correctness of the DKG protocol.

### Functions

#### `dkg_part1`

This function initiates Round 1 for a participant:

- It generates the participant's initial state and message using a provided secret and cryptographic context.
- It returns the serialized state and message for further processing.

#### `combine_round1_msgs`

This function processes the messages received during Round 1:

- It deserializes the state and messages, and updates the participant's state with the received messages.
- It returns the serialized final state for transitioning to Round 2.

#### `intiate_round2`

This function initiates Round 2 for a participant:

- It deserializes the final Round 1 state and generates the Round 2 state and shares.
- It returns the serialized state and shares for further processing.

#### `add_shares`

This function processes the shares received during Round 2:

- It deserializes the Round 2 state and received shares, and updates the participant's state with the received shares.
- It returns the serialized final state for completing Round 2.

#### `end_round2`

This function finalizes Round 2 for a participant:

- It deserializes the Round 2 state and produces the participant's share of the secret key, along with the public key and threshold public key.
- It returns the serialized share and keys for verification.

#### `reconstruct_share`

This function verifies the correctness of the DKG protocol by reconstructing the secret:

- It deserializes and combines the final shares to reconstruct the original secret.
- It compares the reconstructed secret with the expected value to ensure correctness.




## Core Implementation of FROST Key Generation

## Round 1: Initialization and Share Distribution

### Struct Round1State<G>:
Fields: id, threshold, shares, coeff_comms, secret.

Methods:
- start_with_random_secret<R, D>: Generate random secret, initialize state.
- start_with_given_secret<R, D>: Feldman VSS to create shares, commitments; Schnorr PoK.
- add_received_message<D>: Validate Schnorr PoK, store commitments.
- finish(): Check threshold, transition to Round 2.

### Struct Round1Msg<G>:
Fields: sender_id, comm_coeffs, schnorr_proof.

## Round 2: Share Collection and Verification

### Struct Round2State<G>:
Fields: id, threshold, shares, coeff_comms.

Methods:
- add_received_share<'a>: Validate and store shares.
- finish<'a>: Generate final share, participant’s public key, threshold public key.

## Key Steps

- Random Secret Generation: G::ScalarField::rand(rng).
- Feldman VSS: feldman_vss::deal_secret().
- Schnorr PoK: PokDiscreteLogProtocol::init(), compute_random_oracle_challenge(), schnorr.gen_proof().
- Message Handling: Verify Schnorr PoK, store polynomial commitments.
- Share Verification: Validate shares against commitments.
- Public Key Computation: Aggregate public keys, G::mul_bigint().
