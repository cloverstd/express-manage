"""empty message

Revision ID: 9fd6609cc106
Revises: 7e0b1d2db635
Create Date: 2016-05-15 22:27:05.610812

"""

# revision identifiers, used by Alembic.
revision = '9fd6609cc106'
down_revision = '7e0b1d2db635'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('order', sa.Column('user_name_id', sa.Integer(), nullable=True))
    op.drop_constraint(u'order_ibfk_2', 'order', type_='foreignkey')
    op.create_foreign_key(None, 'order', 'user_name', ['user_name_id'], ['id'])
    op.drop_column('order', 'user_id')
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
    op.add_column('order', sa.Column('user_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'order', type_='foreignkey')
    op.create_foreign_key(u'order_ibfk_2', 'order', 'user', ['user_id'], ['id'])
    op.drop_column('order', 'user_name_id')
    ### end Alembic commands ###
