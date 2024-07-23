'use server';
import 'server-only';

import { sql } from '@vercel/postgres';

export const createUsersTable = async () => {
  try {
    const result = await sql`CREATE TABLE michaela_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    date_of_birth DATE,
    phone VARCHAR(20)
);`;
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createRolesTable = async () => {
  try {
    const result = await sql`CREATE TABLE michaela_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);`;
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createUsersRolesTable = async () => {
  try {
    const result = await sql`CREATE TABLE michaela_users_roles (
    user_id INT REFERENCES michaela_users(id),
    role_id INT REFERENCES michaela_roles(id),
    PRIMARY KEY (user_id, role_id)
);`;
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createConfigurationsTable = async () => {
  try {
    const result = await sql`CREATE TABLE michaela_configurations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    days INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    expiration INT
);`;
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createBookingsTable = async () => {
  try {
    const result = await sql`CREATE TABLE michaela_bookings (
    id SERIAL PRIMARY KEY,
    date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES michaela_users(id),
    configuration_id INT REFERENCES michaela_configurations(id)
);`;
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createSubscriptionsTable = async () => {
  try {
    await sql`
      CREATE TABLE michaela_subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES michaela_users(id) ON DELETE CASCADE,
        config_id INT NOT NULL,
        start_date INT NOT NULL
      );
    `;
    return 'Subscriptions table created successfully';
  } catch (error) {
    console.error(error);
    return error;
  }
};
