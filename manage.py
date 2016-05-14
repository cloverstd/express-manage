# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 22:44

from application import create_app
from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from application.models import db

app = create_app()

manager = Manager(app)

migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)


@manager.command
def run():
    """Run app."""
    app.run(
        host=app.config.get('HOST', '0.0.0.0'),
        port=app.config.get('PORT', app.config.get('PORT'))
    )


if __name__ == '__main__':
    manager.run()
