exports.up = async function(knex) {
  await knex.schema.createTable("co_impacters", table => {
    table.increments("impacter_id");
    table.string("name").notNullable();
    table.text("bio");
    table.string("profile_image");
    table.string("image");

    table
      .enu("status", ["ONBOARDING", "ACTIVE", "INACTIVE", "DELETED"])
      .defaultTo("ONBOARDING")
      .notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("co_posts", table => {
    table.increments("post_id");
    table.string("description", 512);
    table.enu("type", ["IMAGES", "TEXT", "VIDEOS", "STORY"]).notNullable();
    table
      .enu("status", ["VISIBLE", "HIDDEN", "DELETED"])
      .defaultTo("VISIBLE")
      .notNullable();
    table.jsonb("data").notNullable();
    table
      .integer("reaction_count")
      .unsigned()
      .defaultTo(0)
      .notNullable();
    table
      .integer("impacter_id")
      .unsigned()
      .notNullable();
    table.foreign("impacter_id").references("co_impacters.impacter_id");

    table.timestamp("published_at");
    table.timestamps(true, true);
    table.index("impacter_id");
    table.index("published_at");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("co_posts");
  await knex.schema.dropTableIfExists("co_impacters");
};
