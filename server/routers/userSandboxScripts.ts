import { UserSandboxScript } from "@/comp/atom";
import { procedure } from "@server/trpc";
import { ScriptTypeZod, UserSandboxScriptZod } from "@server/zod";
import { z } from "zod";

export const fetchOneSandboxScript = procedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .output(UserSandboxScriptZod)
  .query(async (opts) => {
    try {
      const script = await opts.ctx.prisma.sandboxScript.findFirst({
        where: {
          id: opts.input.id,
        },
      });

      if (script === null) {
        throw new Error(`No script found with id ${opts.input.id}`);
      }

      return script;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  });

export const fetchUserSandboxScripts = procedure
  .output(z.array(UserSandboxScriptZod))
  .query(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      const userScripts = await opts.ctx.prisma.sandboxScript.findMany({
        where: {
          userId: opts.ctx.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const userScriptsZod = userScripts.map((script) => {
        return {
          id: script.id,
          userId: script.userId,
          // content: script.content,
          scriptType: script.scriptType,
          freeformContent: script.freeformContent,
          pubkeyScript: script.pubkeyScript,
          sigScript: script.sigScript,
          witnessScript: script.witnessScript,
          createdAt: script.createdAt,
          name: script.name,
          updatedAt: script.updatedAt,
          description: script.description,
        };
      });

      return userScriptsZod;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  });

export const createSandboxScriptEvent = procedure
  .input(
    z.object({
      name: z.string(),
      // content: z.string(),
      scriptType: ScriptTypeZod,
      freeformContent: z.string().optional(),
      pubkeyScript: z.string().optional(),
      sigScript: z.string().optional(),
      witnessScript: z.string().optional(),
      description: z.string(),
    })
  )
  .output(UserSandboxScriptZod)
  .mutation(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      const userScriptEvent = await opts.ctx.prisma.sandboxScript.create({
        data: {
          // content: opts.input.content,
          name: opts.input.name,
          description: opts.input.description,
          scriptType: opts.input.scriptType,
          freeformContent: opts.input.freeformContent,
          pubkeyScript: opts.input.pubkeyScript,
          sigScript: opts.input.sigScript,
          witnessScript: opts.input.witnessScript,
          user: {
            connect: {
              id: opts.ctx.user.id,
            },
          },
        },
      });

      const scriptEvent = {
        id: userScriptEvent.id,
        // content: userScriptEvent.content,
        scriptType: userScriptEvent.scriptType,
        freeformContent: userScriptEvent.freeformContent,
        pubkeyScript: userScriptEvent.pubkeyScript,
        sigScript: userScriptEvent.sigScript,
        witnessScript: userScriptEvent.witnessScript,
        createdAt: userScriptEvent.createdAt,
        userId: userScriptEvent.userId,
        name: userScriptEvent.name,
        updatedAt: userScriptEvent.updatedAt,
        description: userScriptEvent.description,
      };

      return scriptEvent;
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const updateSandboxScriptEvent = procedure
  .input(
    z.object({
      id: z.number(),
      // content: z.string(),
      scriptType: z.enum(["FREEFORM", "PUBKEY_SIGSCRIPT", "PUBKEY_WITNESS"]),
      freeformContent: z.string().optional(),
      pubkeyScript: z.string().optional(),
      sigScript: z.string().optional(),
      witnessScript: z.string().optional(),
      name: z.string(),
      description: z.string().optional(),
    })
  )
  .output(UserSandboxScriptZod)
  .mutation(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      const scriptEvent = await opts.ctx.prisma.sandboxScript.updateMany({
        where: {
          id: opts.input.id,
          userId: opts.ctx.user.id,
        },
        data: {
          // content: opts.input.content,
          name: opts.input.name,
          description: opts.input.description,
          scriptType: opts.input.scriptType,
          freeformContent: opts.input.freeformContent,
          pubkeyScript: opts.input.pubkeyScript,
          sigScript: opts.input.sigScript,
          witnessScript: opts.input.witnessScript,
          updatedAt: new Date(),
        },
      });

      if (scriptEvent.count === 0) {
        throw new Error("Script event not found or already completed");
      }

      const updatedScriptEvent = await opts.ctx.prisma.sandboxScript.findFirst({
        where: {
          id: opts.input.id,
          userId: opts.ctx.user.id,
        },
      });

      if (!updatedScriptEvent) {
        throw new Error("Updated script event not found");
      }

      return {
        id: updatedScriptEvent.id,
        // content: updatedScriptEvent.content,
        scriptType: updatedScriptEvent.scriptType,
        freeformContent: updatedScriptEvent.freeformContent,
        pubkeyScript: updatedScriptEvent.pubkeyScript,
        sigScript: updatedScriptEvent.sigScript,
        witnessScript: updatedScriptEvent.witnessScript,
        createdAt: updatedScriptEvent.createdAt,
        userId: updatedScriptEvent.userId,
        name: updatedScriptEvent.name,
        updatedAt: updatedScriptEvent.updatedAt,
        description: updatedScriptEvent.description,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const bookmarkSandboxScript = procedure
  .input(
    z.object({
      scriptId: z.number(),
    })
  )
  .output(z.object(UserSandboxScriptZod.shape))
  .mutation(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      // Check if the script with the given ID exists
      const script = await opts.ctx.prisma.sandboxScript.findFirst({
        where: {
          id: opts.input.scriptId,
        },
      });

      if (!script) {
        throw new Error(`Script with ID ${opts.input.scriptId} not found`);
      }

      // Check if the script is already bookmarked by the user
      const existingBookmark = await opts.ctx.prisma.bookmarkScript.findFirst({
        where: {
          userId: opts.ctx.user.id,
          scriptId: opts.input.scriptId,
        },
      });

      if (existingBookmark) {
        throw new Error("Script is already bookmarked by the user");
      }

      // Create a new SavedScript entry to bookmark the script
      const savedScript = await opts.ctx.prisma.bookmarkScript.create({
        data: {
          userId: opts.ctx.user.id,
          scriptId: opts.input.scriptId,
        },
      });

      const userSandboxScript = {
        id: savedScript.id,
        userId: savedScript.userId,
        // content: script.content,
        scriptType: script.scriptType,
        freeformContent: script.freeformContent,
        pubkeyScript: script.pubkeyScript,
        sigScript: script.sigScript,
        witnessScript: script.witnessScript,
        name: script.name,
        description: script.description,
        createdAt: savedScript.createdAt,
        updatedAt: savedScript.createdAt,
      };

      return userSandboxScript;
    } catch (err: any) {
      throw new Error(err.message); // Provide a clearer error message
    }
  });

export const fetchUserBookmarkedScripts = procedure
  .output(z.array(UserSandboxScriptZod))
  .query(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      // Find all script IDs associated with the current user in the bookmarkScript table
      const userScriptIds = await opts.ctx.prisma.bookmarkScript.findMany({
        where: {
          userId: opts.ctx.user.id,
        },
        select: {
          scriptId: true,
        },
      });

      // Map the script IDs to an array
      const scriptIds = userScriptIds.map((bookmark) => bookmark.scriptId);

      // Find all scripts with the retrieved script IDs
      const userScripts = await opts.ctx.prisma.sandboxScript.findMany({
        where: {
          id: {
            in: scriptIds,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const userScriptsZod = userScripts.map((script) => {
        return {
          id: script.id,
          userId: script.userId,
          // content: script.content,
          scriptType: script.scriptType,
          freeformContent: script.freeformContent,
          pubkeyScript: script.pubkeyScript,
          sigScript: script.sigScript,
          witnessScript: script.witnessScript,
          createdAt: script.createdAt,
          name: script.name,
          updatedAt: script.updatedAt,
          description: script.description,
        };
      });

      return userScriptsZod;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  });

export const removeBookmark = procedure
  .input(
    z.object({
      scriptId: z.number(),
    })
  )
  .output(z.object(UserSandboxScriptZod.shape))
  .mutation(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      // Check if the script with the given ID exists
      const script = await opts.ctx.prisma.sandboxScript.findFirst({
        where: {
          id: opts.input.scriptId,
        },
      });

      if (!script) {
        throw new Error(`Script with ID ${opts.input.scriptId} not found`);
      }

      // Check if the script is bookmarked by the user
      const existingBookmark = await opts.ctx.prisma.bookmarkScript.findFirst({
        where: {
          userId: opts.ctx.user.id,
          scriptId: opts.input.scriptId,
        },
      });

      if (!existingBookmark) {
        throw new Error("Script is not bookmarked by the user");
      }

      // Remove the bookmark by deleting the entry from the bookmarkScript table
      await opts.ctx.prisma.bookmarkScript.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      const userSandboxScript = {
        id: script.id,
        userId: script.userId,
        // content: script.content,
        scriptType: script.scriptType,
        freeformContent: script.freeformContent,
        pubkeyScript: script.pubkeyScript,
        sigScript: script.sigScript,
        witnessScript: script.witnessScript,
        name: script.name,
        description: script.description,
        createdAt: script.createdAt,
        updatedAt: script.updatedAt,
      };

      return userSandboxScript;
    } catch (err: any) {
      throw new Error(err.message); // Provide a clearer error message
    }
  });

export const deleteScript = procedure
  .input(
    z.object({
      scriptId: z.number(),
    })
  )
  .output(z.object(UserSandboxScriptZod.shape))
  .mutation(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      // Check if the script with the given ID exists
      const script = await opts.ctx.prisma.sandboxScript.findFirst({
        where: {
          id: opts.input.scriptId,
          userId: opts.ctx.user.id, // Ensure the script belongs to the user
        },
      });

      if (!script) {
        throw new Error(`Script with ID ${opts.input.scriptId} not found`);
      }

      // Delete the script by removing it from the sandboxScript table
      await opts.ctx.prisma.sandboxScript.delete({
        where: {
          id: opts.input.scriptId,
        },
      });

      const userSandboxScript = {
        id: script.id,
        userId: script.userId,
        // content: script.content,
        scriptType: script.scriptType,
        freeformContent: script.freeformContent,
        pubkeyScript: script.pubkeyScript,
        sigScript: script.sigScript,
        witnessScript: script.witnessScript,
        name: script.name,
        description: script.description,
        createdAt: script.createdAt,
        updatedAt: script.updatedAt,
      };

      return userSandboxScript;
    } catch (err: any) {
      throw new Error(err.message); // Provide a clearer error message
    }
  });
