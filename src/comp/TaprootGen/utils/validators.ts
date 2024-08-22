import { SCRIPT_INPUT_VALIDATOR, ValidatorOutput } from "../types";
import * as secp256k1 from "@noble/secp256k1";

export function validateInput(
  validatorType: SCRIPT_INPUT_VALIDATOR,
  value: string
): ValidatorOutput {
  console.log("-------------------------------------");
  console.log(" this is the validator type: ", validatorType);
  console.log("-------------------------------------");
  switch (validatorType) {
    case SCRIPT_INPUT_VALIDATOR.HEX:
      return validateHex(value);
    case SCRIPT_INPUT_VALIDATOR.DECIMAL:
      return validateDecimal(value);
    case SCRIPT_INPUT_VALIDATOR.STRING:
      return validateString(value);
    case SCRIPT_INPUT_VALIDATOR.PUBKEY:
      return validatePubKey(value);
    case SCRIPT_INPUT_VALIDATOR.HASH:
      return validateHash(value);
    default:
      return {
        valid: true,
        message: "",
      };
  }
}

// TODO: move this into a utility file so everything is kept neat
function validateHash(value: string): ValidatorOutput {
  // if the value is not 40 characters(20 bytes), return false
  if (value?.length !== 40) {
    return {
      valid: false,
      message: "Input must be 20 bytes",
    };
  }
  // Check if the value is a valid hex value
  const hexRegex = /^[0-9A-Fa-f]+$/;
  if (!hexRegex.test(value)) {
    return {
      valid: false,
      message: "Invalid hex value",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

// function validatePubKey(value: string): ValidatorOutput {
//   const pubKeyRegex = /^[0-9A-Fa-f]{64}$/;
//   if (!pubKeyRegex.test(value)) {
//     return {
//       valid: false,
//       message: "Invalid pubkey value",
//     };
//   }
//   return {
//     valid: true,
//     message: "",
//   };
// }

function validateHex(value: string): ValidatorOutput {
  const hexRegex = /^[0-9A-Fa-f]+$/;
  if (!hexRegex.test(value)) {
    return {
      valid: false,
      message: "Invalid hex value",
    };
  }
  return {
    valid: true,
    message: "",
  };
}

function validateDecimal(value: string): ValidatorOutput {
  const decimalRegex = /^-?\d*\.?\d+$/;
  if (!decimalRegex.test(value)) {
    return {
      valid: false,
      message: "Invalid Decimal Value",
    };
  } else {
    return {
      valid: true,
      message: "",
    };
  }
}

function validateString(value: string): ValidatorOutput {
  if (value?.trim().length === 0) {
    return {
      valid: false,
      message: "Invalid String Value",
    };
  } else {
    return {
      valid: true,
      message: "",
    };
  }
}

// Function to validate public key using secp256k1, it appears this was too overkill and was not really needed. Leaving this here, just incase we might need it in future
function validatePubKey(key: string): ValidatorOutput {
  // Check if the key is a valid hex string of the correct length, this should support both compressed and uncompressed keys
  const hexRegex = /^(02|03)[0-9A-Fa-f]{64}$|^04[0-9A-Fa-f]{128}$/;
  if (!hexRegex.test(key)) {
    return {
      valid: false,
      message: "Invalid Public Key",
    };
  }
  try {
    const publicKey = secp256k1.ProjectivePoint.fromHex(key);

    publicKey.assertValidity();

    return {
      valid: true,
      message: "",
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      valid: false,
      message: "Invalid Public Key",
    };
  }
}
