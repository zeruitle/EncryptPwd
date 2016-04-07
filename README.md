# EncryptPwd

This is an extension project for Google Chrome

The purpose of this extension is to have an easy way for chrome user to use a client-side encryption to protect their password

1. The extension is going to apply to every url, and search for "input" tag, "password" type
2. Once there is a "password" type in the DOM, the extension is going to listen if the "input" is clicked
3. When "input" is clicked, a new input field will be appened, and user can type in their master password in it.
4. With every "keyup"(not neccessary jqury, might implement in just js), the extension gonna to calculte the final password based on settings, and set the final password into the oringinal "inpute" field
5. The settings can be set by clicking the extension tab
6. The settings include: different character sets, different encrytion

The project is going to be open source

2016/04/07 Project starts
