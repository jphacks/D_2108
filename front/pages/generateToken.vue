<template>
    <p>null</p>
</template>

<script>
export default {
    mounted(){
    const {RtcTokenBuilder,RtcRole,} = require('agora-access-token')
    const appID = process.env.NUXT_ENV_APP_ID;
const appCertificate = process.env.NUXT_ENV_CERTIFICATE;
const channelName = 'hogepiyo';
const uid = 2882341273;
const account = "2882341273";
const role = RtcRole.PUBLISHER;

const expirationTimeInSeconds = 3600

const currentTimestamp = Math.floor(Date.now() / 1000)

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

// IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

// Build token with uid
const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
console.log("Token With Integer Number Uid: " + tokenA);
console.log('channel = '+ channelName);

// Build token with user account
const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
console.log("Token With UserAccount: " + tokenB);
    }
}
</script>