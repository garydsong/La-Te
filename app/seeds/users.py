from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    brandon = User(
        first_name='Brandon',
        last_name='Task',
        username='Taskman',
        email='task@demo.io',
        password='password',
        city='Los Angeles',
        state='CA',
        avatar='https://i.imgur.com/fjZQLH6.png',
        bio='Just one task at a time, baby.',
        cover_img='https://i.imgur.com/fd7DOMv.jpeg',
        website='https://task.com')
    amanda = User(
        first_name='Amanda',
        last_name='Vien',
        username='vienerschnitzle',
        email='vien@demo.io',
        password='password',
        city='San Jose',
        state='CA',
        avatar='https://i.imgur.com/K16viYr.jpeg',
        bio='Have you ever had so much matcha you started loving everything so matcha?',
        cover_img='https://i.imgur.com/i5ntVQT.jpeg',
        website='https://vien.com')
    gary = User(
        first_name='Gary',
        last_name='Song',
        username='garysdong',
        email='song@demo.io',
        password='password',
        city='San Diego',
        state='CA',
        avatar='https://i.imgur.com/aqzuU9V.jpeg',
        bio="Got Anita Baker booming out the '87 Buick (bitch) Stepping in some Pumas, but this Molly got me booted (whew)",
        cover_img='https://i.imgur.com/UhL70iU.jpeg',
        website='https://vien.com')
    sam = User(
        first_name='Sam',
        last_name='Suh',
        username='suhspect',
        email='suh@demo.io',
        password='password',
        city='Tahoe',
        state='CA',
        avatar='https://i.imgur.com/haMHDJg.png',
        bio="Give me a ride or everybody dies!",
        cover_img='https://i.imgur.com/ZFp94vq.png',
        website='https://suh.com')
    jake = User(
        first_name='Jake',
        last_name='Matillano',
        username='jzm',
        email='jake@demo.io',
        password='password',
        city='San Gabriel',
        state='CA',
        avatar='https://i.imgur.com/ecIn1Df.gif',
        bio="Let me borrow your car real quick",
        cover_img='https://i.imgur.com/iwfXFC7.jpeg',
        website='https://jake.com')
    alex = User(
        first_name='Alex',
        last_name='Dam',
        username='alexdam',
        email='alex@demo.io',
        password='password',
        city='Santa Cruz',
        state='CA',
        avatar='https://i.imgur.com/464wdYD.png',
        bio="Just nod and carry on.",
        cover_img='https://i.imgur.com/tF8i5H0.png',
        website='https://alex.com')
    john = User(
        first_name='John',
        last_name='Carerra',
        username='BadReg',
        email='john@demo.io',
        password='password',
        city='Port Saint Lucy',
        state='FL',
        avatar='https://i.imgur.com/iMKvMzQ.png',
        bio="According to my calculations, if you don't like Linux I'm not quite sure I like you.",
        cover_img='https://i.imgur.com/zn8BPfL.png',
        website='https://deadlysin.com')
    logan = User(
        first_name='Logan',
        last_name='Seals',
        username='sealtheselipsbaby',
        email='seal@demo.io',
        password='password',
        city='Houston',
        state='TX',
        avatar='https://i.imgur.com/sHyIHYK.png',
        bio="OUR lips are sealed ;)",
        cover_img='https://i.imgur.com/hhytUaw.png',
        website='https://logan.com')
    jae = User(
        first_name='Jae',
        last_name='Hwang',
        username='jaejaejetplane',
        email='jae@demo.io',
        password='password',
        city='NorCal',
        state='CA',
        avatar='https://i.imgur.com/y8pCNmh.jpeg',
        bio="FAFO FAFO FAFO FAFO",
        cover_img='https://i.imgur.com/j9GEhzz.png',
        website='https://jae.com')
    michael = User(
        first_name='Michael',
        last_name='Jung',
        username='BigJungs',
        email='jung@demo.io',
        password='password',
        city='Los Angeles',
        state='CA',
        avatar='https://i.imgur.com/480KqHw.png',
        bio="You junga? Me junga. We big jungas.",
        cover_img='https://i.imgur.com/VyixBUj.png',
        website='https://michael.com')
    david = User(
        first_name='David',
        last_name='Rogers',
        username='9ziggy9',
        email='drogers@demo.io',
        password='password',
        city='Turlock',
        state='CA',
        avatar='https://i.imgur.com/JBsyeyD.png',
        bio="You junga? Me junga. We big jungas.",
        cover_img='https://i.imgur.com/t057Wr7.png',
        website='https://david.com')
    keke = User(
        first_name='Keke',
        last_name='Life',
        username='XOK3K3Llif3',
        email='keke@demo.io',
        password='password',
        city='San Diego',
        state='CA',
        avatar='https://i.imgur.com/SAF6qvd.png',
        bio="Name = Keke. Like = Lizard",
        cover_img='https://i.imgur.com/KJCSsqX.png',
        website='https://iwantlizard.com')

    db.session.add(brandon)
    db.session.add(amanda)
    db.session.add(gary)
    db.session.add(sam)
    db.session.add(jake)
    db.session.add(alex)
    db.session.add(john)
    db.session.add(logan)
    db.session.add(jae)
    db.session.add(michael)
    db.session.add(david)
    db.session.add(keke)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
