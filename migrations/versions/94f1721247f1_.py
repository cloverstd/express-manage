"""empty message

Revision ID: 94f1721247f1
Revises: 9fd6609cc106
Create Date: 2016-05-17 10:30:45.191085

"""

# revision identifiers, used by Alembic.
revision = '94f1721247f1'
down_revision = '9fd6609cc106'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('store', sa.Column('default', sa.Boolean(), nullable=True))
    op.alter_column('user', 'mobile',
               existing_type=mysql.VARCHAR(length=11),
               nullable=True,
               existing_server_default=sa.text(u"''"))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'mobile',
               existing_type=mysql.VARCHAR(length=11),
               nullable=False,
               existing_server_default=sa.text(u"''"))
    op.drop_column('store', 'default')
    ### end Alembic commands ###
