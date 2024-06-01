/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.13.0
 * @fluencelabs/aqua-to-js version: 0.3.5
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, ParticleContext as ParticleContext$$ } from '@fluencelabs/js-client';

// Making aliases to reduce chance of accidental name collision
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$
} from '@fluencelabs/js-client';


// Functions
export const runRoundOne_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "id") [] -id-arg-)
       )
       (new $option-inline
        (seq
         (seq
          (new %Deal_obj_map
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (ap ("chainNetwork" "local") %Deal_obj_map)
                 (ap ("chainNetworkId" 31337) %Deal_obj_map)
                )
                (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %Deal_obj_map)
               )
               (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %Deal_obj_map)
              )
              (ap ("definition" "bafkreicxcv34olfeeh3vive25ouyezaix5t5wmgaioahisx3hwwqqq77hy") %Deal_obj_map)
             )
             (ap ("timestamp" "2024-06-01T07:28:07.589Z") %Deal_obj_map)
            )
            (canon %init_peer_id% %Deal_obj_map  Deal_obj)
           )
          )
          (xor
           (ap Deal_obj $option-inline)
           (null)
          )
         )
         (canon %init_peer_id% $option-inline  #option-inline-0)
        )
       )
      )
      (new %Deals_obj_map
       (seq
        (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
        (canon %init_peer_id% %Deals_obj_map  Deals_obj)
       )
      )
     )
     (ap Deals_obj.$.myDeployment Deals_obj_flat)
    )
    (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
   )
   (xor
    (seq
     (seq
      (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
      (new -if-error-
       (xor
        (seq
         (match ret.$.success false
          (seq
           (new $array-inline
            (seq
             (seq
              (ap "Failed to resolve subnet: " $array-inline)
              (ap ret.$.error $array-inline)
             )
             (canon -relay- $array-inline  #array-inline-0)
            )
           )
           (call -relay- ("run-console" "print") [#array-inline-0])
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (seq
         (seq
          (ap :error: -if-error-)
          (xor
           (seq
            (match :error:.$.error_code 10001
             (null)
            )
            (new $-ephemeral-stream-
             (new #-ephemeral-canon-
              (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
             )
            )
           )
           (fail -if-error-)
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
       )
      )
     )
     (xor
      (seq
       (seq
        (seq
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
         (call ret.$.workers.[0].worker_id.[0] ("myService" "dkg_part1") [-id-arg-] ret-0)
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
      )
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (fail :error:)
      )
     )
    )
    (fail :error:)
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type RunRoundOneResultType = { round1_msg: number[]; round1_state: number[]; }

export type RunRoundOneParams = [id: number, config?: {ttl?: number}] | [peer: IFluenceClient$$, id: number, config?: {ttl?: number}];

export type RunRoundOneResult = Promise<RunRoundOneResultType>;

export function runRoundOne(...args: RunRoundOneParams): RunRoundOneResult {
    return callFunction$$(
        args,
        {
    "functionName": "runRoundOne",
    "arrow": {
        "domain": {
            "fields": {
                "id": {
                    "name": "u16",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "Round1Result",
                    "fields": {
                        "round1_msg": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        },
                        "round1_state": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        }
                    },
                    "tag": "struct"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        runRoundOne_script
    );
}

export const helloWorldRemote_script = `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "name") [] -name-arg-)
   )
   (xor
    (seq
     (seq
      (call -relay- ("op" "concat_strings") ["Hello, " -name-arg-] ret)
      (call -relay- ("op" "concat_strings") [ret "! From "] ret-0)
     )
     (call -relay- ("op" "concat_strings") [ret-0 -relay-] ret-1)
    )
    (fail :error:)
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret-1])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type HelloWorldRemoteParams = [name: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, name: string, config?: {ttl?: number}];

export type HelloWorldRemoteResult = Promise<string>;

export function helloWorldRemote(...args: HelloWorldRemoteParams): HelloWorldRemoteResult {
    return callFunction$$(
        args,
        {
    "functionName": "helloWorldRemote",
    "arrow": {
        "domain": {
            "fields": {
                "name": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "string",
                    "tag": "scalar"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        helloWorldRemote_script
    );
}

export const addRoundOneMessages_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "round1_state") [] -round1_state-arg-)
         )
         (call %init_peer_id% ("getDataSrv" "messages") [] -messages-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "id") [] -id-arg-)
       )
       (new $option-inline
        (seq
         (seq
          (new %Deal_obj_map
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (ap ("chainNetwork" "local") %Deal_obj_map)
                 (ap ("chainNetworkId" 31337) %Deal_obj_map)
                )
                (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %Deal_obj_map)
               )
               (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %Deal_obj_map)
              )
              (ap ("definition" "bafkreicxcv34olfeeh3vive25ouyezaix5t5wmgaioahisx3hwwqqq77hy") %Deal_obj_map)
             )
             (ap ("timestamp" "2024-06-01T07:28:07.589Z") %Deal_obj_map)
            )
            (canon %init_peer_id% %Deal_obj_map  Deal_obj)
           )
          )
          (xor
           (ap Deal_obj $option-inline)
           (null)
          )
         )
         (canon %init_peer_id% $option-inline  #option-inline-0)
        )
       )
      )
      (new %Deals_obj_map
       (seq
        (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
        (canon %init_peer_id% %Deals_obj_map  Deals_obj)
       )
      )
     )
     (ap Deals_obj.$.myDeployment Deals_obj_flat)
    )
    (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
   )
   (xor
    (seq
     (seq
      (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
      (new -if-error-
       (xor
        (seq
         (match ret.$.success false
          (seq
           (new $array-inline
            (seq
             (seq
              (ap "Failed to resolve subnet: " $array-inline)
              (ap ret.$.error $array-inline)
             )
             (canon -relay- $array-inline  #array-inline-0)
            )
           )
           (call -relay- ("run-console" "print") [#array-inline-0])
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (seq
         (seq
          (ap :error: -if-error-)
          (xor
           (seq
            (match :error:.$.error_code 10001
             (null)
            )
            (new $-ephemeral-stream-
             (new #-ephemeral-canon-
              (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
             )
            )
           )
           (fail -if-error-)
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
       )
      )
     )
     (xor
      (seq
       (seq
        (seq
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
         (call ret.$.workers.[0].worker_id.[0] ("myService" "combine_round1_msgs") [-round1_state-arg- -messages-arg- -id-arg-] ret-0)
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
      )
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (fail :error:)
      )
     )
    )
    (fail :error:)
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type AddRoundOneMessagesResultType = { round1_state: number[]; }

export type AddRoundOneMessagesParams = [round1_state: number[], messages: number[][], id: number, config?: {ttl?: number}] | [peer: IFluenceClient$$, round1_state: number[], messages: number[][], id: number, config?: {ttl?: number}];

export type AddRoundOneMessagesResult = Promise<AddRoundOneMessagesResultType>;

export function addRoundOneMessages(...args: AddRoundOneMessagesParams): AddRoundOneMessagesResult {
    return callFunction$$(
        args,
        {
    "functionName": "addRoundOneMessages",
    "arrow": {
        "domain": {
            "fields": {
                "round1_state": {
                    "type": {
                        "name": "u8",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "messages": {
                    "type": {
                        "type": {
                            "name": "u8",
                            "tag": "scalar"
                        },
                        "tag": "array"
                    },
                    "tag": "array"
                },
                "id": {
                    "name": "u16",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "Round1FinalState",
                    "fields": {
                        "round1_state": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        }
                    },
                    "tag": "struct"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        addRoundOneMessages_script
    );
}

export const showSubnet_script = `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (new $services
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (seq
            (new $option-inline
             (seq
              (seq
               (new %Deal_obj_map
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (ap ("chainNetwork" "local") %Deal_obj_map)
                      (ap ("chainNetworkId" 31337) %Deal_obj_map)
                     )
                     (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %Deal_obj_map)
                    )
                    (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %Deal_obj_map)
                   )
                   (ap ("definition" "bafkreicxcv34olfeeh3vive25ouyezaix5t5wmgaioahisx3hwwqqq77hy") %Deal_obj_map)
                  )
                  (ap ("timestamp" "2024-06-01T07:28:07.589Z") %Deal_obj_map)
                 )
                 (canon %init_peer_id% %Deal_obj_map  Deal_obj)
                )
               )
               (xor
                (ap Deal_obj $option-inline)
                (null)
               )
              )
              (canon %init_peer_id% $option-inline  #option-inline-0)
             )
            )
            (new %Deals_obj_map
             (seq
              (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
              (canon %init_peer_id% %Deals_obj_map  Deals_obj)
             )
            )
           )
           (ap Deals_obj.$.myDeployment Deals_obj_flat)
          )
          (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
         )
         (xor
          (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
          (fail :error:)
         )
        )
        (new -if-error-
         (xor
          (seq
           (match ret.$.success false
            (seq
             (new $array-inline
              (seq
               (seq
                (ap "Failed to resolve subnet: " $array-inline)
                (ap ret.$.error $array-inline)
               )
               (canon %init_peer_id% $array-inline  #array-inline-0)
              )
             )
             (call %init_peer_id% ("run-console" "print") [#array-inline-0])
            )
           )
           (new $-ephemeral-stream-
            (new #-ephemeral-canon-
             (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
            )
           )
          )
          (seq
           (seq
            (ap :error: -if-error-)
            (xor
             (seq
              (match :error:.$.error_code 10001
               (null)
              )
              (new $-ephemeral-stream-
               (new #-ephemeral-canon-
                (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
               )
              )
             )
             (fail -if-error-)
            )
           )
           (new $-ephemeral-stream-
            (new #-ephemeral-canon-
             (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
            )
           )
          )
         )
        )
       )
       (fold ret.$.workers w-0
        (seq
         (new -if-else-error-
          (new -else-error-
           (new -if-error-
            (xor
             (mismatch w-0.$.worker_id []
              (new $services_aliases
               (new $spells_aliases
                (xor
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (seq
                       (seq
                        (seq
                         (new $-ephemeral-stream-
                          (new #-ephemeral-canon-
                           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                          )
                         )
                         (new $-ephemeral-stream-
                          (new #-ephemeral-canon-
                           (canon w-0.$.host_id $-ephemeral-stream-  #-ephemeral-canon-)
                          )
                         )
                        )
                        (call w-0.$.worker_id.[0] ("srv" "list") [] ret-0)
                       )
                       (fold ret-0 s-0
                        (seq
                         (seq
                          (seq
                           (seq
                            (ap s-0.$.aliases s-0_flat)
                            (ap s-0_flat s-0_flat_to_functor)
                           )
                           (ap s-0_flat_to_functor.length s-0_flat_length)
                          )
                          (new -if-error-
                           (xor
                            (mismatch s-0_flat_length 0
                             (seq
                              (new -if-error-
                               (xor
                                (match s-0.$.service_type "spell"
                                 (ap s-0.$.aliases.[0] $spells_aliases)
                                )
                                (seq
                                 (ap :error: -if-error-)
                                 (xor
                                  (match :error:.$.error_code 10001
                                   (null)
                                  )
                                  (fail -if-error-)
                                 )
                                )
                               )
                              )
                              (new -if-error-
                               (xor
                                (match s-0.$.service_type "service"
                                 (ap s-0.$.aliases.[0] $services_aliases)
                                )
                                (seq
                                 (ap :error: -if-error-)
                                 (xor
                                  (match :error:.$.error_code 10001
                                   (null)
                                  )
                                  (fail -if-error-)
                                 )
                                )
                               )
                              )
                             )
                            )
                            (seq
                             (ap :error: -if-error-)
                             (xor
                              (match :error:.$.error_code 10002
                               (null)
                              )
                              (fail -if-error-)
                             )
                            )
                           )
                          )
                         )
                         (next s-0)
                        )
                        (null)
                       )
                      )
                      (par
                       (new $option-inline-1
                        (seq
                         (xor
                          (seq
                           (canon w-0.$.worker_id.[0] $services_aliases  #push-to-stream-118)
                           (ap #push-to-stream-118 $option-inline-1)
                          )
                          (null)
                         )
                         (canon w-0.$.worker_id.[0] $option-inline-1  #option-inline-1-0)
                        )
                       )
                       (new $option-inline-2
                        (seq
                         (xor
                          (seq
                           (canon w-0.$.worker_id.[0] $spells_aliases  #push-to-stream-123)
                           (ap #push-to-stream-123 $option-inline-2)
                          )
                          (null)
                         )
                         (canon w-0.$.worker_id.[0] $option-inline-2  #option-inline-2-0)
                        )
                       )
                      )
                     )
                     (new %WorkerServices_obj_map
                      (seq
                       (seq
                        (seq
                         (seq
                          (ap ("host_id" w-0.$.host_id) %WorkerServices_obj_map)
                          (ap ("services" #option-inline-1-0) %WorkerServices_obj_map)
                         )
                         (ap ("spells" #option-inline-2-0) %WorkerServices_obj_map)
                        )
                        (ap ("worker_id" w-0.$.worker_id) %WorkerServices_obj_map)
                       )
                       (canon w-0.$.worker_id.[0] %WorkerServices_obj_map  WorkerServices_obj)
                      )
                     )
                    )
                    (ap WorkerServices_obj $services)
                   )
                   (new $-ephemeral-stream-
                    (new #-ephemeral-canon-
                     (canon w-0.$.host_id $-ephemeral-stream-  #-ephemeral-canon-)
                    )
                   )
                  )
                  (new $-ephemeral-stream-
                   (new #-ephemeral-canon-
                    (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                   )
                  )
                 )
                 (seq
                  (seq
                   (seq
                    (new $-ephemeral-stream-
                     (new #-ephemeral-canon-
                      (canon w-0.$.host_id $-ephemeral-stream-  #-ephemeral-canon-)
                     )
                    )
                    (new $-ephemeral-stream-
                     (new #-ephemeral-canon-
                      (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                     )
                    )
                   )
                   (new $-ephemeral-stream-
                    (new #-ephemeral-canon-
                     (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
                    )
                   )
                  )
                  (fail :error:)
                 )
                )
               )
              )
             )
             (seq
              (ap :error: -if-error-)
              (xor
               (match :error:.$.error_code 10002
                (seq
                 (new %WorkerServices_obj-0_map
                  (seq
                   (seq
                    (seq
                     (seq
                      (ap ("host_id" w-0.$.host_id) %WorkerServices_obj-0_map)
                      (ap ("services" []) %WorkerServices_obj-0_map)
                     )
                     (ap ("spells" []) %WorkerServices_obj-0_map)
                    )
                    (ap ("worker_id" []) %WorkerServices_obj-0_map)
                   )
                   (canon %init_peer_id% %WorkerServices_obj-0_map  WorkerServices_obj-0)
                  )
                 )
                 (ap WorkerServices_obj-0 $services)
                )
               )
               (seq
                (seq
                 (ap :error: -else-error-)
                 (xor
                  (match :error:.$.error_code 10001
                   (ap -if-error- -if-else-error-)
                  )
                  (ap -else-error- -if-else-error-)
                 )
                )
                (fail -if-else-error-)
               )
              )
             )
            )
           )
          )
         )
         (next w-0)
        )
        (null)
       )
      )
      (canon %init_peer_id% $services  #-services-fix-0)
     )
     (ap #-services-fix-0 -services-flat-0)
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [-services-flat-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type ShowSubnetParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type ShowSubnetResult = Promise<{ host_id: string; services: string[] | null; spells: string[] | null; worker_id: string | null; }[]>;

export function showSubnet(...args: ShowSubnetParams): ShowSubnetResult {
    return callFunction$$(
        args,
        {
    "functionName": "showSubnet",
    "arrow": {
        "domain": {
            "fields": {},
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerServices",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "services": {
                                "type": {
                                    "type": {
                                        "name": "string",
                                        "tag": "scalar"
                                    },
                                    "tag": "array"
                                },
                                "tag": "option"
                            },
                            "spells": {
                                "type": {
                                    "type": {
                                        "name": "string",
                                        "tag": "scalar"
                                    },
                                    "tag": "array"
                                },
                                "tag": "option"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        showSubnet_script
    );
}

export const getInfo_script = `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (xor
    (call -relay- ("peer" "identify") [] ret)
    (fail :error:)
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret -relay-])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetInfoResultType = [{ node_version: string; spell_version: string; external_addresses: string[]; allowed_binaries: string[]; air_version: string; }, string]

export type GetInfoParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type GetInfoResult = Promise<GetInfoResultType>;

export function getInfo(...args: GetInfoParams): GetInfoResult {
    return callFunction$$(
        args,
        {
    "functionName": "getInfo",
    "arrow": {
        "domain": {
            "fields": {},
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "Info",
                    "fields": {
                        "node_version": {
                            "name": "string",
                            "tag": "scalar"
                        },
                        "spell_version": {
                            "name": "string",
                            "tag": "scalar"
                        },
                        "external_addresses": {
                            "type": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        },
                        "allowed_binaries": {
                            "type": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        },
                        "air_version": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                {
                    "name": "string",
                    "tag": "scalar"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        getInfo_script
    );
}

export const runDeployedServices_script = `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (new $answers
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (seq
            (new $option-inline
             (seq
              (seq
               (new %Deal_obj_map
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (ap ("chainNetwork" "local") %Deal_obj_map)
                      (ap ("chainNetworkId" 31337) %Deal_obj_map)
                     )
                     (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %Deal_obj_map)
                    )
                    (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %Deal_obj_map)
                   )
                   (ap ("definition" "bafkreicxcv34olfeeh3vive25ouyezaix5t5wmgaioahisx3hwwqqq77hy") %Deal_obj_map)
                  )
                  (ap ("timestamp" "2024-06-01T07:28:07.589Z") %Deal_obj_map)
                 )
                 (canon %init_peer_id% %Deal_obj_map  Deal_obj)
                )
               )
               (xor
                (ap Deal_obj $option-inline)
                (null)
               )
              )
              (canon %init_peer_id% $option-inline  #option-inline-0)
             )
            )
            (new %Deals_obj_map
             (seq
              (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
              (canon %init_peer_id% %Deals_obj_map  Deals_obj)
             )
            )
           )
           (ap Deals_obj.$.myDeployment Deals_obj_flat)
          )
          (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
         )
         (xor
          (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
          (fail :error:)
         )
        )
        (new -if-error-
         (xor
          (match ret.$.success false
           (seq
            (new $array-inline
             (seq
              (seq
               (ap "Failed to resolve subnet: " $array-inline)
               (ap ret.$.error $array-inline)
              )
              (canon %init_peer_id% $array-inline  #array-inline-0)
             )
            )
            (call %init_peer_id% ("run-console" "print") [#array-inline-0])
           )
          )
          (seq
           (ap :error: -if-error-)
           (xor
            (match :error:.$.error_code 10001
             (null)
            )
            (fail -if-error-)
           )
          )
         )
        )
       )
       (fold ret.$.workers w-0
        (seq
         (new -if-else-error-
          (new -else-error-
           (new -if-error-
            (xor
             (match w-0.$.worker_id []
              (seq
               (new %Answer_obj_map
                (seq
                 (seq
                  (ap ("answer" []) %Answer_obj_map)
                  (ap ("worker" w-0) %Answer_obj_map)
                 )
                 (canon %init_peer_id% %Answer_obj_map  Answer_obj)
                )
               )
               (ap Answer_obj $answers)
              )
             )
             (seq
              (ap :error: -if-error-)
              (xor
               (match :error:.$.error_code 10001
                (xor
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (seq
                       (new $-ephemeral-stream-
                        (new #-ephemeral-canon-
                         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                        )
                       )
                       (new $-ephemeral-stream-
                        (new #-ephemeral-canon-
                         (canon w-0.$.host_id $-ephemeral-stream-  #-ephemeral-canon-)
                        )
                       )
                      )
                      (new $option-inline-1
                       (seq
                        (xor
                         (ap "mkc" $option-inline-1)
                         (null)
                        )
                        (canon w-0.$.worker_id.[0] $option-inline-1  #option-inline-1-0)
                       )
                      )
                     )
                     (new %Answer_obj-0_map
                      (seq
                       (seq
                        (ap ("answer" #option-inline-1-0) %Answer_obj-0_map)
                        (ap ("worker" w-0) %Answer_obj-0_map)
                       )
                       (canon w-0.$.worker_id.[0] %Answer_obj-0_map  Answer_obj-0)
                      )
                     )
                    )
                    (ap Answer_obj-0 $answers)
                   )
                   (new $-ephemeral-stream-
                    (new #-ephemeral-canon-
                     (canon w-0.$.host_id $-ephemeral-stream-  #-ephemeral-canon-)
                    )
                   )
                  )
                  (new $-ephemeral-stream-
                   (new #-ephemeral-canon-
                    (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                   )
                  )
                 )
                 (seq
                  (seq
                   (seq
                    (new $-ephemeral-stream-
                     (new #-ephemeral-canon-
                      (canon w-0.$.host_id $-ephemeral-stream-  #-ephemeral-canon-)
                     )
                    )
                    (new $-ephemeral-stream-
                     (new #-ephemeral-canon-
                      (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                     )
                    )
                   )
                   (new $-ephemeral-stream-
                    (new #-ephemeral-canon-
                     (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
                    )
                   )
                  )
                  (fail :error:)
                 )
                )
               )
               (seq
                (seq
                 (ap :error: -else-error-)
                 (xor
                  (match :error:.$.error_code 10001
                   (ap -if-error- -if-else-error-)
                  )
                  (ap -else-error- -if-else-error-)
                 )
                )
                (fail -if-else-error-)
               )
              )
             )
            )
           )
          )
         )
         (next w-0)
        )
        (null)
       )
      )
      (canon %init_peer_id% $answers  #-answers-fix-0)
     )
     (ap #-answers-fix-0 -answers-flat-0)
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [-answers-flat-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type RunDeployedServicesParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type RunDeployedServicesResult = Promise<{ answer: string | null; worker: { host_id: string; pat_id: string; worker_id: string | null; }; }[]>;

export function runDeployedServices(...args: RunDeployedServicesParams): RunDeployedServicesResult {
    return callFunction$$(
        args,
        {
    "functionName": "runDeployedServices",
    "arrow": {
        "domain": {
            "fields": {},
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "Answer",
                        "fields": {
                            "answer": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            },
                            "worker": {
                                "name": "Worker",
                                "fields": {
                                    "host_id": {
                                        "name": "string",
                                        "tag": "scalar"
                                    },
                                    "pat_id": {
                                        "name": "string",
                                        "tag": "scalar"
                                    },
                                    "worker_id": {
                                        "type": {
                                            "name": "string",
                                            "tag": "scalar"
                                        },
                                        "tag": "option"
                                    }
                                },
                                "tag": "struct"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        runDeployedServices_script
    );
}

export const addShares_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "round2_state") [] -round2_state-arg-)
         )
         (call %init_peer_id% ("getDataSrv" "shares") [] -shares-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "id") [] -id-arg-)
       )
       (new $option-inline
        (seq
         (seq
          (new %Deal_obj_map
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (ap ("chainNetwork" "local") %Deal_obj_map)
                 (ap ("chainNetworkId" 31337) %Deal_obj_map)
                )
                (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %Deal_obj_map)
               )
               (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %Deal_obj_map)
              )
              (ap ("definition" "bafkreicxcv34olfeeh3vive25ouyezaix5t5wmgaioahisx3hwwqqq77hy") %Deal_obj_map)
             )
             (ap ("timestamp" "2024-06-01T07:28:07.589Z") %Deal_obj_map)
            )
            (canon %init_peer_id% %Deal_obj_map  Deal_obj)
           )
          )
          (xor
           (ap Deal_obj $option-inline)
           (null)
          )
         )
         (canon %init_peer_id% $option-inline  #option-inline-0)
        )
       )
      )
      (new %Deals_obj_map
       (seq
        (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
        (canon %init_peer_id% %Deals_obj_map  Deals_obj)
       )
      )
     )
     (ap Deals_obj.$.myDeployment Deals_obj_flat)
    )
    (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
   )
   (xor
    (seq
     (seq
      (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
      (new -if-error-
       (xor
        (seq
         (match ret.$.success false
          (seq
           (new $array-inline
            (seq
             (seq
              (ap "Failed to resolve subnet: " $array-inline)
              (ap ret.$.error $array-inline)
             )
             (canon -relay- $array-inline  #array-inline-0)
            )
           )
           (call -relay- ("run-console" "print") [#array-inline-0])
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (seq
         (seq
          (ap :error: -if-error-)
          (xor
           (seq
            (match :error:.$.error_code 10001
             (null)
            )
            (new $-ephemeral-stream-
             (new #-ephemeral-canon-
              (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
             )
            )
           )
           (fail -if-error-)
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
       )
      )
     )
     (xor
      (seq
       (seq
        (seq
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
         (call ret.$.workers.[0].worker_id.[0] ("myService" "add_shares") [-round2_state-arg- -shares-arg- -id-arg-] ret-0)
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
      )
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (fail :error:)
      )
     )
    )
    (fail :error:)
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type AddSharesResultType = { round2_state: number[]; }

export type AddSharesParams = [round2_state: number[], shares: number[][], id: number, config?: {ttl?: number}] | [peer: IFluenceClient$$, round2_state: number[], shares: number[][], id: number, config?: {ttl?: number}];

export type AddSharesResult = Promise<AddSharesResultType>;

export function addShares(...args: AddSharesParams): AddSharesResult {
    return callFunction$$(
        args,
        {
    "functionName": "addShares",
    "arrow": {
        "domain": {
            "fields": {
                "round2_state": {
                    "type": {
                        "name": "u8",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "shares": {
                    "type": {
                        "type": {
                            "name": "u8",
                            "tag": "scalar"
                        },
                        "tag": "array"
                    },
                    "tag": "array"
                },
                "id": {
                    "name": "u16",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "Round2FinalState",
                    "fields": {
                        "round2_state": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        }
                    },
                    "tag": "struct"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        addShares_script
    );
}

export const helloWorld_script = `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "name") [] -name-arg-)
   )
   (call %init_peer_id% ("op" "concat_strings") ["Hello, " -name-arg-] ret)
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type HelloWorldParams = [name: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, name: string, config?: {ttl?: number}];

export type HelloWorldResult = Promise<string>;

export function helloWorld(...args: HelloWorldParams): HelloWorldResult {
    return callFunction$$(
        args,
        {
    "functionName": "helloWorld",
    "arrow": {
        "domain": {
            "fields": {
                "name": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "string",
                    "tag": "scalar"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        helloWorld_script
    );
}

export const initiateRoundTwo_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "round1_state") [] -round1_state-arg-)
       )
       (new $option-inline
        (seq
         (seq
          (new %Deal_obj_map
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (ap ("chainNetwork" "local") %Deal_obj_map)
                 (ap ("chainNetworkId" 31337) %Deal_obj_map)
                )
                (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %Deal_obj_map)
               )
               (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %Deal_obj_map)
              )
              (ap ("definition" "bafkreicxcv34olfeeh3vive25ouyezaix5t5wmgaioahisx3hwwqqq77hy") %Deal_obj_map)
             )
             (ap ("timestamp" "2024-06-01T07:28:07.589Z") %Deal_obj_map)
            )
            (canon %init_peer_id% %Deal_obj_map  Deal_obj)
           )
          )
          (xor
           (ap Deal_obj $option-inline)
           (null)
          )
         )
         (canon %init_peer_id% $option-inline  #option-inline-0)
        )
       )
      )
      (new %Deals_obj_map
       (seq
        (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
        (canon %init_peer_id% %Deals_obj_map  Deals_obj)
       )
      )
     )
     (ap Deals_obj.$.myDeployment Deals_obj_flat)
    )
    (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
   )
   (xor
    (seq
     (seq
      (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
      (new -if-error-
       (xor
        (seq
         (match ret.$.success false
          (seq
           (new $array-inline
            (seq
             (seq
              (ap "Failed to resolve subnet: " $array-inline)
              (ap ret.$.error $array-inline)
             )
             (canon -relay- $array-inline  #array-inline-0)
            )
           )
           (call -relay- ("run-console" "print") [#array-inline-0])
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (seq
         (seq
          (ap :error: -if-error-)
          (xor
           (seq
            (match :error:.$.error_code 10001
             (null)
            )
            (new $-ephemeral-stream-
             (new #-ephemeral-canon-
              (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
             )
            )
           )
           (fail -if-error-)
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
       )
      )
     )
     (xor
      (seq
       (seq
        (seq
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
         (call ret.$.workers.[0].worker_id.[0] ("myService" "intiate_round2") [-round1_state-arg-] ret-0)
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
      )
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (fail :error:)
      )
     )
    )
    (fail :error:)
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type InitiateRoundTwoResultType = { round2_state: number[]; shares: number[]; }

export type InitiateRoundTwoParams = [round1_state: number[], config?: {ttl?: number}] | [peer: IFluenceClient$$, round1_state: number[], config?: {ttl?: number}];

export type InitiateRoundTwoResult = Promise<InitiateRoundTwoResultType>;

export function initiateRoundTwo(...args: InitiateRoundTwoParams): InitiateRoundTwoResult {
    return callFunction$$(
        args,
        {
    "functionName": "initiateRoundTwo",
    "arrow": {
        "domain": {
            "fields": {
                "round1_state": {
                    "type": {
                        "name": "u8",
                        "tag": "scalar"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "Round2Result",
                    "fields": {
                        "round2_state": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        },
                        "shares": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        }
                    },
                    "tag": "struct"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        initiateRoundTwo_script
    );
}

export const endRoundTwo_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "round2_state") [] -round2_state-arg-)
       )
       (new $option-inline
        (seq
         (seq
          (new %Deal_obj_map
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (ap ("chainNetwork" "local") %Deal_obj_map)
                 (ap ("chainNetworkId" 31337) %Deal_obj_map)
                )
                (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %Deal_obj_map)
               )
               (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %Deal_obj_map)
              )
              (ap ("definition" "bafkreicxcv34olfeeh3vive25ouyezaix5t5wmgaioahisx3hwwqqq77hy") %Deal_obj_map)
             )
             (ap ("timestamp" "2024-06-01T07:28:07.589Z") %Deal_obj_map)
            )
            (canon %init_peer_id% %Deal_obj_map  Deal_obj)
           )
          )
          (xor
           (ap Deal_obj $option-inline)
           (null)
          )
         )
         (canon %init_peer_id% $option-inline  #option-inline-0)
        )
       )
      )
      (new %Deals_obj_map
       (seq
        (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
        (canon %init_peer_id% %Deals_obj_map  Deals_obj)
       )
      )
     )
     (ap Deals_obj.$.myDeployment Deals_obj_flat)
    )
    (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
   )
   (xor
    (seq
     (seq
      (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
      (new -if-error-
       (xor
        (seq
         (match ret.$.success false
          (seq
           (new $array-inline
            (seq
             (seq
              (ap "Failed to resolve subnet: " $array-inline)
              (ap ret.$.error $array-inline)
             )
             (canon -relay- $array-inline  #array-inline-0)
            )
           )
           (call -relay- ("run-console" "print") [#array-inline-0])
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (seq
         (seq
          (ap :error: -if-error-)
          (xor
           (seq
            (match :error:.$.error_code 10001
             (null)
            )
            (new $-ephemeral-stream-
             (new #-ephemeral-canon-
              (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
             )
            )
           )
           (fail -if-error-)
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
       )
      )
     )
     (xor
      (seq
       (seq
        (seq
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
         (call ret.$.workers.[0].worker_id.[0] ("myService" "end_round2") [-round2_state-arg-] ret-0)
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
      )
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon ret.$.workers.[0].host_id $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (fail :error:)
      )
     )
    )
    (fail :error:)
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type EndRoundTwoResultType = { pk: string; share: number[]; t_pk: string; }

export type EndRoundTwoParams = [round2_state: number[], config?: {ttl?: number}] | [peer: IFluenceClient$$, round2_state: number[], config?: {ttl?: number}];

export type EndRoundTwoResult = Promise<EndRoundTwoResultType>;

export function endRoundTwo(...args: EndRoundTwoParams): EndRoundTwoResult {
    return callFunction$$(
        args,
        {
    "functionName": "endRoundTwo",
    "arrow": {
        "domain": {
            "fields": {
                "round2_state": {
                    "type": {
                        "name": "u8",
                        "tag": "scalar"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "EndRound2Result",
                    "fields": {
                        "pk": {
                            "name": "string",
                            "tag": "scalar"
                        },
                        "share": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        },
                        "t_pk": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        endRoundTwo_script
    );
}

export const getInfos_script = `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "peers") [] -peers-arg-)
   )
   (new $infos
    (seq
     (seq
      (fold -peers-arg- p-0
       (seq
        (xor
         (seq
          (seq
           (seq
            (new $-ephemeral-stream-
             (new #-ephemeral-canon-
              (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
             )
            )
            (call p-0 ("peer" "identify") [] ret)
           )
           (ap ret $infos)
          )
          (new $-ephemeral-stream-
           (new #-ephemeral-canon-
            (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
           )
          )
         )
         (seq
          (seq
           (new $-ephemeral-stream-
            (new #-ephemeral-canon-
             (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
            )
           )
           (new $-ephemeral-stream-
            (new #-ephemeral-canon-
             (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next p-0)
       )
       (null)
      )
      (canon %init_peer_id% $infos  #-infos-fix-0)
     )
     (ap #-infos-fix-0 -infos-flat-0)
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [-infos-flat-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetInfosParams = [peers: string[], config?: {ttl?: number}] | [peer: IFluenceClient$$, peers: string[], config?: {ttl?: number}];

export type GetInfosResult = Promise<{ node_version: string; spell_version: string; external_addresses: string[]; allowed_binaries: string[]; air_version: string; }[]>;

export function getInfos(...args: GetInfosParams): GetInfosResult {
    return callFunction$$(
        args,
        {
    "functionName": "getInfos",
    "arrow": {
        "domain": {
            "fields": {
                "peers": {
                    "type": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "Info",
                        "fields": {
                            "node_version": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "spell_version": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "external_addresses": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "array"
                            },
                            "allowed_binaries": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "array"
                            },
                            "air_version": {
                                "name": "string",
                                "tag": "scalar"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        getInfos_script
    );
}
