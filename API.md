# API Reference

## Round One

### Run Round One
- **URL:** `/my/callback/roundOne`
- **Method:** `POST`
- **Description:** Initiates round one of the process.
- **Request Body:**
  ```json
  {
    "id": "number",
    "secret": "number"
  }
  ```
- **Response Body:**
  ```json
  {
    "round1_state": [],
    "round1_msg": [],
    "secret": "string"
  }
  ```

### Add Round One Messages
- **URL:** `/my/callback/roundOne/addMessages`
- **Method:** `POST`
- **Description:** Adds messages to round one of the process.
- **Request Body:**
  ```json
  {
    "id": "number",
    "messages": [[]],
    "round1State": []
  }
  ```
- **Response Body:**
  ```json
  {
    "round1_state": []
  }
  ```

## Round Two

### Initiate Round Two
- **URL:** `/my/callback/roundTwo/initiate`
- **Method:** `POST`
- **Description:** Initiates round two of the process.
- **Request Body:**
  ```json
  {
    "round1State": []
  }
  ```
- **Response Body:**
  ```json
  {
    "round2_state": [],
    "shares": []
  }
  ```

### Add Shares
- **URL:** `/my/callback/roundTwo/addShares`
- **Method:** `POST`
- **Description:** Adds shares to round two of the process.
- **Request Body:**
  ```json
  {
    "round2State": [],
    "shares": [[]],
    "id": "number"
  }
  ```
- **Response Body:**
  ```json
  {
    "round2_state": []
  }
  ```

### End Round Two
- **URL:** `/my/callback/roundTwo/end`
- **Method:** `POST`
- **Description:** Ends round two of the process.
- **Request Body:**
  ```json
  {
    "round2State": []
  }
  ```
- **Response Body:**
  ```json
  {
    "share": [],
    "pk": "string",
    "t_pk": "string"
  }
  ```

## Share Reconstruction

### Reconstruct Share
- **URL:** `/my/callback/reconstruct`
- **Method:** `POST`
- **Description:** Reconstructs shares.
- **Request Body:**
  ```json
  {
    "shares": [[]]
  }
  ```
- **Response Body:**
  ```json
  {
    "recontructed_share": "string"
  }
  ```



### Function Refrences
These are the functions used in `mySevices`

#### `dkg_part1`

**Arguments:**
- `identitfier: u16` The identifier which uniquely identifies the participant
- `secret: u64` The secret for all people to sign

**Returns:** 
- `Round1Result`:
  - `round1_state: Vec<u8>`
  - `round1_msg: Vec<u8>`

#### `combine_round1_msgs`

**Arguments:**
- `round1_state: Vec<u8>`
- `round1_messages: Vec<Vec<u8>>`
- `identifier: u16`

**Returns:** 
- `Round1FinalState`:
  - `round1_state: Vec<u8>`

#### `intiate_round2`

**Arguments:**
- `round1_state: Vec<u8>`

**Returns:** 
- `Round2Result`:
  - `round2_state: Vec<u8>`
  - `shares: Vec<u8>`

#### `add_shares`

**Arguments:**
- `round2_state: Vec<u8>`
- `all_shares: Vec<Vec<u8>>`
- `identifier: u16`

**Returns:** 
- `Round2FinalState`:
  - `round2_state: Vec<u8>`

#### `end_round2`

**Arguments:**
- `round2_state: Vec<u8>`

**Returns:** 
- `EndRound2Result`:
  - `share: Vec<u8>`
  - `pk: String`
  - `t_pk: String`

#### `reconstruct_share`

**Arguments:**
- `final_share: Vec<Vec<u8>>`
- `round1_final_states: Vec<Vec<u8>>`

**Returns:** 
- `()`
