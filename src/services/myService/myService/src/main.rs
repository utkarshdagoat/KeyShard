#![allow(non_snake_case)]
use std::{fmt::Debug, process::id};

use ark_bls12_381::{
    fr::FrConfig,
    g1::{G1_GENERATOR_X, G1_GENERATOR_Y},
    G1Affine,
};
use ark_ff::{Fp, MontBackend};
use blake2::Blake2b512;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;
use rand::rngs::StdRng;
use rand::SeedableRng;
use secret_sharing_and_dkg::{
    common::{ParticipantId, Share, Shares},
    frost_dkg::{self, Round1Msg, Round1State, Round2State},
};

module_manifest!();

pub fn main() {}

#[marine]
struct Round1Result {
    round1_state: Vec<u8>,
    round1_msg: Vec<u8>,
}

#[marine]
fn dkg_part1(identitfier: u16) -> Round1Result {
    const MAX_SIGNER: u16 = 5;
    const MIN_SIGNER: u16 = 3;
    let schnorr_ctx = b"test-ctx";
    let mut rng = StdRng::seed_from_u64(0);
    let pub_key_base = G1Affine::new(G1_GENERATOR_X, G1_GENERATOR_Y);
    let participant_id = identitfier as ParticipantId;
    let (round1_state, round1_msg) =
        frost_dkg::Round1State::start_with_random_secret::<StdRng, Blake2b512>(
            &mut rng,
            participant_id,
            MIN_SIGNER,
            MAX_SIGNER,
            schnorr_ctx,
            &pub_key_base,
        )
        .unwrap();
    Round1Result {
        round1_state: bincode::serialize(&round1_state).unwrap(),
        round1_msg: bincode::serialize(&round1_msg).unwrap(),
    }
}

#[marine]
struct Round1FinalState {
    round1_state: Vec<u8>,
}

#[marine]
fn combine_round1_msgs(
    round1_state: Vec<u8>,
    round1_messages: Vec<Vec<u8>>,
    identifier: u16,
) -> Round1FinalState {
    let schnorr_ctx = b"test-ctx";
    let pub_key_base = G1Affine::new(G1_GENERATOR_X, G1_GENERATOR_Y);
    let participant_id = identifier as ParticipantId;
    let mut round1_state_desirialized =
        bincode::deserialize::<Round1State<G1Affine>>(&round1_state).unwrap();
    for (i, message) in round1_messages.iter().enumerate() {
        if i + 1 != participant_id.into() {
            let round1_msg = bincode::deserialize::<Round1Msg<G1Affine>>(&message).unwrap();
            round1_state_desirialized
                .add_received_message::<Blake2b512>(round1_msg, schnorr_ctx, &pub_key_base)
                .unwrap();
        }
    }
    Round1FinalState {
        round1_state: bincode::serialize(&round1_state_desirialized).unwrap(),
    }
}

#[marine]
struct Round2Result {
    round2_state: Vec<u8>,
    shares: Vec<u8>,
}

#[marine]
fn intiate_round2(round1_state: Vec<u8>) -> Round2Result {
    let mut round1_state_desirialized =
        bincode::deserialize::<Round1State<G1Affine>>(&round1_state).unwrap();
    let (round2, shares) = round1_state_desirialized.finish().unwrap();
    Round2Result {
        round2_state: bincode::serialize(&round2).unwrap(),
        shares: bincode::serialize(&shares).unwrap(),
    }
}

#[marine]
struct Round2FinalState {
    round2_state: Vec<u8>,
}

#[marine]
fn add_shares(
    round2_state: Vec<u8>,
    all_shares: Vec<Vec<u8>>,
    identifier: u16
) -> Round2FinalState {
    let mut round2_state_deserialized =
        bincode::deserialize::<Round2State<G1Affine>>(&round2_state).unwrap();
    let pub_key_base = G1Affine::new(G1_GENERATOR_X, G1_GENERATOR_Y);
    let participant_id = identifier as ParticipantId;
    for (i, share) in all_shares.iter().enumerate() {
        if i + 1 != participant_id.into() {
            let share =
                bincode::deserialize::<Shares<Fp<MontBackend<FrConfig, 4>, 4>>>(&share).unwrap();
            round2_state_deserialized
                .add_received_share((i+1) as u16, share.0[(participant_id-1) as usize].clone(), &pub_key_base)
                .unwrap();
        }
    }
    Round2FinalState {
        round2_state: bincode::serialize(&round2_state_deserialized).unwrap(),
    }
}

#[marine]
struct EndRound2Result {
    share: Vec<u8>,
    pk: String,
    t_pk: String,
}

#[marine]
fn end_round2(round2_state: Vec<u8>) ->EndRound2Result {
    let mut round2_state_deserialized =
        bincode::deserialize::<Round2State<G1Affine>>(&round2_state).unwrap();
    let pub_key_base = G1Affine::new(G1_GENERATOR_X, G1_GENERATOR_Y);
    let (share, pk, t_pk) = round2_state_deserialized.finish(&pub_key_base).unwrap();
    
    EndRound2Result {
        share: bincode::serialize(&share).unwrap(),
        pk: pk.to_string(),
        t_pk: t_pk.to_string(),
    }
}
