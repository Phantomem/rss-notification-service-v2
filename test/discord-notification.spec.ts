import {parseDiscordMessages} from "../src/discord-notification";

describe('discord-notification', () => {
  describe('parseDiscordMessages', () => {
    it('should return one message', () => {
      const messages = ['short message'];
      const result = parseDiscordMessages(messages);
      expect(result).toEqual(messages);
    });
    it('should return one merged message', () => {
      const messages = ['one', 'two'];
      const result = parseDiscordMessages(messages);
      expect(result).toEqual([`${messages[0]}\n${messages[1]}`]);
    });
    it('should return two messages', () => {
      const firstMessage = '1'.repeat(1000);
      const secondMessage = '2'.repeat(1000);
      const messages = [firstMessage, secondMessage];
      const result = parseDiscordMessages(messages);
      expect(result).toEqual(messages);
    });
    it('should skip first message', () => {
      console.error = jest.fn()
      const firstMessage = '1'.repeat(2001);
      const secondMessage = '2'.repeat(1000);
      const messages = [firstMessage, secondMessage];
      const result = parseDiscordMessages(messages);
      expect(result).toEqual([secondMessage]);
      expect(console.error).toBeCalledTimes(1);
    });
    it('should return', () => {
      console.error = jest.fn()
      const firstMessage = '1'.repeat(500);
      const secondMessage = '2'.repeat(500);
      const thirdMessage = '3'.repeat(1000);
      const messages = [firstMessage, secondMessage, thirdMessage];
      const result = parseDiscordMessages(messages);
      expect(result).toEqual([`${firstMessage}\n${secondMessage}`, thirdMessage]);
    });
  });
});