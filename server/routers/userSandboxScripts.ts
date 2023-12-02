import { UserSandboxScript } from "@/comp/atom";
import { procedure } from "@server/trpc";
import { UserSandboxScriptZod } from "@server/zod";
import { z } from "zod";

export const fetchOneSandboxScript = procedure
  .input(
    z.object({
      id: z.number(),
    }),
  )
  .output(UserSandboxScriptZod)
  .query(async (opts) => {
    try {
      const script = await opts.ctx.prisma.sandboxScript.findFirst({
        where: {
          id: opts.input.id,
        }
      })

      if (script === null) {
        throw new Error(`No script found with id ${opts.input.id}`)
      }
    
      return script
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error("An unknown error occurred")
      }
    }
  })

export const fetchUserSandboxScripts = procedure
  .output(z.array(UserSandboxScriptZod))
  .query(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action")
      }
    
      const userScripts = await opts.ctx.prisma.sandboxScript.findMany({
        where: {
          userId: opts.ctx.user.id,
        },
        orderBy: {
          createdAt: "desc"
        },
      })
    
      const userScriptsZod = userScripts.map((script) => {
        return {
          id: script.id,
          userId: script.userId,
          content: script.content,
          createdAt: script.createdAt,
          name: script.name,
          updatedAt: script.updatedAt,
          description: script.description,
        }
      })

      return userScriptsZod
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error("An unknown error occurred")
      }
    }
  })

export const createSandboxScriptEvent = procedure
  .input(
    z.object({
      name: z.string(),
      content: z.string(),
      description: z.string(),
    })
  )
  .output(UserSandboxScriptZod)
  .mutation(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action")
      }

      const userScriptEvent = await opts.ctx.prisma.sandboxScript.create({
        data: {
          content: opts.input.content,
          name: opts.input.name,
          description: opts.input.description,
          user: {
            connect: {
              id: opts.ctx.user.id,
            },
          },
        },
      })

      const scriptEvent = {
        id: userScriptEvent.id,
        content: userScriptEvent.content,
        createdAt: userScriptEvent.createdAt,
        userId: userScriptEvent.userId,
        name: userScriptEvent.name,
        updatedAt: userScriptEvent.updatedAt,
        description: userScriptEvent.description,
      }

      return scriptEvent
    } catch (err: any) {
      throw new Error(err)
    }
  })

export const updateSandboxScriptEvent = procedure
  .input(
    z.object({
      id: z.number(),
      content: z.string(),
      name: z.string(),
      description: z.string(),
    })
  )
  .output(UserSandboxScriptZod)
  .mutation(async (opts) => {
    try {
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action")
      }

      const scriptEvent = await opts.ctx.prisma.sandboxScript.updateMany({
        where: {
          id: opts.input.id,
          userId: opts.ctx.user.id,
        },
        data: {
          content: opts.input.content,
          name: opts.input.name,
          description: opts.input.description,
          updatedAt: new Date(),
        },
      })

      if (scriptEvent.count === 0) {
        throw new Error("Script event not found or already completed")
      }

      const updatedScriptEvent = await opts.ctx.prisma.sandboxScript.findFirst({
        where: {
          id: opts.input.id,
          userId: opts.ctx.user.id,
        },
      })

      if (!updatedScriptEvent) {
        throw new Error("Updated script event not found")
      }

      return {
        id: updatedScriptEvent.id,
        content: updatedScriptEvent.content,
        createdAt: updatedScriptEvent.createdAt,
        userId: updatedScriptEvent.userId,
        name: updatedScriptEvent.name,
        updatedAt: updatedScriptEvent.updatedAt,
        description: updatedScriptEvent.description,
      }
    } catch (err: any) {
      throw new Error(err)
    }
  })
