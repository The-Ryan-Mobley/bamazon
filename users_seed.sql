
USE bamazon;
TRUNCATE bamazon.users;
INSERT INTO `users` (`id`,`user_name`,`pass`,`salt`,`user_type`) VALUES (1,'hello','dda58cf135e51cbc4bfdb784ba89acad90120be21c69a4a4655ba0f2101f6ec8186d54bc3f0ac4a0473472ec91c14fe4f74a97f71dc3e547adafc8b0ca4d51e4','2d5bfcb569429924','supervisor');
INSERT INTO `users` (`id`,`user_name`,`pass`,`salt`,`user_type`) VALUES (2,'lorem','3ce2fedf44ec87e2661d91849c55ae276843583c106a6bb759003e7719e84b54eba18d2f3a5e7dfe071be31579e80c9c7d15f1952e1f59dd668f272284881fad','26b87725f4fd1bd5','manager');
INSERT INTO `users` (`id`,`user_name`,`pass`,`salt`,`user_type`) VALUES (3,'john','0fd11e275353c0374d2e39780243a471a7769703f4173317d9a532ca0c2055c22582f0a7e5c080cf5382ca8fd61e263515ddec1289e3beb37c0efac291f9ed58','8f05603ac440c76f','customer');
