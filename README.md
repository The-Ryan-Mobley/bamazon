# bamazon
## Table of Contents
  1. [intro](https://github.com/The-Ryan-Mobley/bamazon/blob/master/README.md#intro)
  2. [bamazon customer](https://github.com/The-Ryan-Mobley/bamazon#bamazon-customer)
  3. [bamazon manager](https://github.com/The-Ryan-Mobley/bamazon#bamazon-manager)
  4. [bamazon Supervisor](https://github.com/The-Ryan-Mobley/bamazon#bamazon-supervisor)
  
## INTRO
  This is a class assignment that utilizes node to query and manipulate SQL databases. The program uses inquirer to create a simple console
based storefront akin to what you would find on old school PDAs. The app is launched by running index.js in node like so

![start](https://drive.google.com/uc?export=view&id=1YYwbVTmqiBmKi5Q6m1FCK5TevobHXYca)

  on start the user will be prompted to either login or create an account, if you dont want to make an account i have seeded 3 dummy logins:
  
  1. username: hello password: world (supervisor)
  2. username: lorem password: ipsum (manager)
  3. username john password: doe (customer)
  
  If the user wants the make a new account they will be promted to enter a unique username, password, and then select the kind of user they
want to be.
  
  ![newUser](https://drive.google.com/uc?export=view&id=1MpZjJn99xqg_Eftk1g8GSSJJXgD5sxew)
  
  Once the user has logged in they will be promted a menu based on their corrisponding user type.
  
## BAMAZON CUSTOMER
  ![customerMain](https://drive.google.com/uc?export=view&id=1fwbnVRENSMEpJ-S3HyEfMYE0utbiz5n0)
  
  Customer Users can browse an inventory of items and 'purchase' them.
  ![shop](https://drive.google.com/uc?export=view&id=1r-_c6nkEsHxHWA-asNWwgrnSr3Cy9Mi-)
  
  Once an item is purchased it will update the sql database and change the quantity. It will update the product sales in the departments
table. If the user inputs an invalid quantity they will be promted that the item is out of stock, and they will be returned to the shop.
  
  ![quantity](https://drive.google.com/uc?export=view&id=16DHSziNb-qkgGx1Zp_jcnJHw1y5BzQRH)
  
## BAMAZON MANAGER
  ![manager](https://drive.google.com/uc?export=view&id=1Q1hXIsY-XOEUq4qSrl4FEz4q4KsJ7qMZ)
  
  From the manager page users can view all products currently on sale, as well as items that have a quantity of less than 100. Users can
also add and remove items.
  ![products](https://drive.google.com/uc?export=view&id=1f1bHOXMj0N9Usj4rThwRh4_8wH8NQTU7)
  ![add](https://drive.google.com/uc?export=view&id=1cp_UFfFySvamb-guEA3Ae103TW7NSqcx)
  ![remove](https://drive.google.com/uc?export=view&id=1OM5wo1fmMq_A8aFMLZASTi98q-jQU_D0)
  
  Users can also increase stock quantities.
  ![stonks](https://drive.google.com/uc?export=view&id=1xKlckjmSo3FAZ8qomMxHURVIoEmATrc-)
  
## BAMAZON SUPERVISOR
  ![supermain](https://drive.google.com/uc?export=view&id=1yDMYubpXsbzhnojJjgIGaQRaZc-hpzfL)
  
  From the supervisor page users can view the sales by each department and also add and remove a department
  ![depts](https://drive.google.com/uc?export=view&id=1PF5KVoudsEl9Q-W62gsZYkEBmN45zAhY)
  
  ![adddept](https://drive.google.com/uc?export=view&id=18Ilzuc1J2AXe5A3CRRjJi6K5o6jJT5K6)
  
  ![removedept](https://drive.google.com/uc?export=view&id=1lumBiSAP7NHH4Ngrl1dW2_VRsR2Lz2nM)
  
  
  
  and finally if you want to quit out of the program select logout and then quit
  ![quit](https://drive.google.com/uc?export=view&id=1DKlQ9PxdbyXpWFOOwQlDjjL3gAe4nBXZ)
  



  



  
  
